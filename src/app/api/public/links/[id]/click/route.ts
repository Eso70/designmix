import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/database/client";
import { extractAnalyticsData } from "@/lib/utils/analytics";
import { addClick } from "@/lib/utils/batch-queue";
import { buildEventId, sendTikTokEvent, toEventTime } from "@/lib/utils/tiktok-events";

type TikTokClickEventName = "ClickButton" | "Contact" | "Lead";

function classifyClickEvent(platform?: string | null): TikTokClickEventName {
  const normalized = (platform || "").toLowerCase();
  if (["whatsapp", "telegram", "viber"].includes(normalized)) {
    return "Contact";
  }
  if (["phone", "email"].includes(normalized)) {
    return "Lead";
  }
  return "ClickButton";
}

// POST /api/public/links/[id]/click - Track unique link click
// Batched inserts reduce database load significantly
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Validate ID - skip if null/empty to reduce API calls
    if (!id || !id.trim()) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Validate UUID format (fail silently for analytics - don't break user experience)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id.trim())) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Try to get linktree_id from request body to avoid extra DB query
    let linktreeId: string | null = null;
    let platform: string | null = null;
    try {
      const body = await request.json().catch(() => ({}));
      const parsed = body as { linktree_id?: string; platform?: string };
      linktreeId = parsed?.linktree_id || null;
      platform = parsed?.platform || null;
    } catch {
      // If body parsing fails, continue without linktree_id
    }
    
    // Only query database if linktree_id not provided
    if (linktreeId && linktreeId.trim()) {
      // Use provided linktree_id - no DB query needed
      extractAnalyticsData(request)
        .then((analyticsData) => {
          // Validate analytics data before adding
          if (analyticsData.ip_address && analyticsData.ip_address.trim()) {
            addClick({
              link_id: id.trim(),
              linktree_id: linktreeId!.trim(),
              ip_address: analyticsData.ip_address.trim(),
              session_id: analyticsData.session_id?.trim() || null,
              clicked_at: new Date().toISOString(),
            }).catch(() => {
              // Silently fail
            });

            const clickedAt = new Date().toISOString();
            const eventName = classifyClickEvent(platform);
            const eventId = buildEventId({
              event: eventName,
              contentId: id.trim(),
              sessionId: analyticsData.session_id,
              ip: analyticsData.ip_address,
              eventTimeIso: clickedAt,
            });
            sendTikTokEvent({
              event: eventName,
              event_time: toEventTime(clickedAt),
              event_id: eventId,
              content_id: `link:${id.trim()}`,
              content_ids: [`link:${id.trim()}`],
              content_type: `${platform?.trim() || "link"}_cta`,
              content_name: platform?.trim() || "link",
              description: `${platform?.trim() || "Link"} CTA click`,
              url: request.headers.get("referer") || request.headers.get("origin") || undefined,
              ip: analyticsData.ip_address,
              user_agent: analyticsData.user_agent,
              ttclid: analyticsData.ttclid,
              ttp: analyticsData.ttp,
            }).catch(() => {
              // Silently fail
            });
          }
        })
        .catch(() => {
          // Silently fail
        });
    } else {
      // Fallback: query database if linktree_id not provided
      Promise.all([
        query<{ id: string; linktree_id: string; platform: string }>(
          "SELECT id, linktree_id, platform FROM links WHERE id = $1",
          [id.trim()]
        ),
        extractAnalyticsData(request),
      ])
        .then(async ([linkResult, analyticsData]) => {
          if (!linkResult.rows || linkResult.rows.length === 0 || !linkResult.rows[0]?.linktree_id) {
            return;
          }

          const link = linkResult.rows[0];
          // Validate all data before adding
          if (link.linktree_id && link.linktree_id.trim() && analyticsData.ip_address && analyticsData.ip_address.trim()) {
            const clickedAt = new Date().toISOString();
            addClick({
              link_id: id.trim(),
              linktree_id: link.linktree_id.trim(),
              ip_address: analyticsData.ip_address.trim(),
              session_id: analyticsData.session_id?.trim() || null,
              clicked_at: clickedAt,
            }).catch(() => {
              // Silently fail
            });

            const eventId = buildEventId({
              event: classifyClickEvent(link.platform),
              contentId: id.trim(),
              sessionId: analyticsData.session_id,
              ip: analyticsData.ip_address,
              eventTimeIso: clickedAt,
            });
            const eventName = classifyClickEvent(link.platform);
            sendTikTokEvent({
              event: eventName,
              event_time: toEventTime(clickedAt),
              event_id: eventId,
              content_id: `link:${id.trim()}`,
              content_ids: [`link:${id.trim()}`],
              content_type: `${link.platform?.trim() || "link"}_cta`,
              content_name: link.platform?.trim() || "link",
              description: `${link.platform?.trim() || "Link"} CTA click`,
              url: request.headers.get("referer") || request.headers.get("origin") || undefined,
              ip: analyticsData.ip_address,
              user_agent: analyticsData.user_agent,
              ttclid: analyticsData.ttclid,
              ttp: analyticsData.ttp,
            }).catch(() => {
              // Silently fail
            });
          }
        })
        .catch(() => {
          // Silently fail
        });
    }

    // Return immediately - batch insert happens in background
    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    // Always return success - analytics failures shouldn't break the page
    return NextResponse.json({ success: true }, { status: 200 });
  }
}
