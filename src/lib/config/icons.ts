import {
  Link, Globe, Mail, Phone, Smartphone, MessageCircle, MapPin, Calendar, Clock, Star, Heart, Music, Video,
  Image as ImageIcon, Camera, ShoppingBag, ShoppingCart, CreditCard, Facebook, Twitter, Instagram, Youtube,
  Linkedin, Github, Twitch, MessageSquare, Send, Briefcase, User, Users, Home, Book, Coffee, Award, Play, Pause, X, Check,
  Zap, Compass, Navigation, Store, Map, Ticket, Activity, Airplay, AlarmClock, AlignCenter, AlignJustify, AlignLeft, AlignRight,
  Anchor, Aperture, Archive, ArrowDown, ArrowUp, ArrowLeft, ArrowRight, AtSign, Battery, BatteryCharging,
  Bell, BellOff, Bluetooth, Bold, Bookmark, Box, Briefcase as BriefcaseAlt, Calendar as CalendarIcon, Cast,
  CheckCircle, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Clipboard, Cloud, CloudDrizzle, CloudLightning,
  CloudRain, CloudSnow, Code, Codepen, Coffee as CoffeeIcon, Columns, Command, Compass as CompassIcon, Copy,
  CornerDownLeft, CornerDownRight, CornerLeftDown, CornerLeftUp, CornerRightDown, CornerRightUp, CornerUpLeft,
  CornerUpRight, Cpu, CreditCard as CreditCardIcon, Crop, Crosshair, Database, Delete, Disc, DollarSign, Download,
  DownloadCloud, Droplet, Edit, Edit2, Edit3, ExternalLink, Eye, EyeOff, FastForward, Feather, File, FileMinus,
  FilePlus, FileText, Film, Filter, Flag, Folder, FolderMinus, FolderPlus, Framer, Frown, Gift, GitBranch,
  GitCommit, GitMerge, GitPullRequest, Grid, HardDrive, Hash, Headphones, HelpCircle, Hexagon, Inbox, Info,
  Key, Layers, Layout, LifeBuoy, Link2, List, Loader, Lock, LogIn, LogOut, Maximize, Maximize2, Mic, MicOff,
  Minimize, Minimize2, Minus, MinusCircle, MinusSquare, Monitor, Moon, MoreHorizontal, MoreVertical, MousePointer,
  Move, Octagon, Package, Paperclip, PauseCircle, PenTool, Percent, PhoneCall, PhoneForwarded, PhoneIncoming,
  PhoneMissed, PhoneOff, PhoneOutgoing, PieChart, PlayCircle, Plus, PlusCircle, PlusSquare, Pocket, Power,
  Printer, Radio, RefreshCcw, RefreshCw, Repeat, Rewind, RotateCcw, RotateCw, Rss, Save, Scissors, Search,
  Server, Settings, Share, Share2, Shield, ShieldOff, ShoppingBag as ShoppingBagIcon, ShoppingCart as ShoppingCartIcon, Shuffle, SkipBack, SkipForward,
  Slack, Slash, Sliders, Smartphone as SmartphoneIcon, Smile, Speaker, Square, StopCircle, Sun, Sunrise, Sunset, Tablet, Tag,
  Target, Terminal, Thermometer, ThumbsDown, ThumbsUp, ToggleLeft, ToggleRight, Trash, Trash2, Trello,
  TrendingDown, TrendingUp, Triangle, Truck, Tv, Type, Umbrella, Underline, Unlock, Upload, UploadCloud,
  UserCheck, UserMinus, UserPlus, Users as UsersIcon, VideoOff, Voicemail, Volume, Volume1, Volume2, VolumeX, Watch, Wifi,
  WifiOff, Wind, XCircle, XOctagon, XSquare, Youtube as YoutubeIcon, ZapOff, ZoomIn, ZoomOut
} from "lucide-react";

import {
  FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaTiktok, FaSnapchat, FaDiscord,
  FaTwitch, FaPinterest, FaSpotify, FaSoundcloud, FaApple, FaAndroid, FaWindows, FaLinux,
  FaGithub, FaGitlab, FaBitbucket, FaSlack, FaTrello, FaFigma, FaSketch, FaInvision,
  FaStripe, FaPaypal, FaAmazon, FaGoogle, FaMicrosoft, FaReddit, FaWhatsapp, FaTelegram,
  FaViber, FaLine, FaWeixin, FaVk, FaOdnoklassniki, FaYandex, FaYahoo,
  FaBitcoin, FaEthereum, FaWallet, FaGamepad, FaRobot, FaGhost
} from "react-icons/fa";

import {
  SiX, SiMastodon, SiThreads, SiPatreon, SiMedium, SiSubstack, SiKofi, SiBuymeacoffee,
  SiLinktree, SiNotion, SiObsidian, SiEvernote, SiDropbox, SiGooglecloud,
  SiAmazon, SiFirebase, SiSupabase, SiVercel, SiNetlify, SiHeroku, SiDigitalocean
} from "react-icons/si";

import type { ComponentType } from "react";

export const CUSTOM_ICONS_MAP: Record<string, ComponentType<{ className?: string }>> = {
  // Lucide Base
  Link, Globe, Mail, Phone, Smartphone, MessageCircle, MapPin, Calendar, Clock, Star, Heart, Music, Video,
  ImageIcon, Camera, ShoppingBag, ShoppingCart, CreditCard, Facebook, Twitter, Instagram, Youtube,
  Linkedin, Github, Twitch, MessageSquare, Send, Briefcase, User, Users, Home, Book, Coffee, Award, Play, Pause, X, Check,
  Zap, Compass, Navigation, Store, Map, Ticket,
  // Lucide Additional
  Activity, Airplay, AlarmClock, AlignCenter, AlignJustify, AlignLeft, AlignRight,
  Anchor, Aperture, Archive, ArrowDown, ArrowUp, ArrowLeft, ArrowRight, AtSign, Battery, BatteryCharging,
  Bell, BellOff, Bluetooth, Bold, Bookmark, Box, BriefcaseAlt, CalendarIcon, Cast,
  CheckCircle, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Clipboard, Cloud, CloudDrizzle, CloudLightning,
  CloudRain, CloudSnow, Code, Codepen, CoffeeIcon, Columns, Command, CompassIcon, Copy,
  CornerDownLeft, CornerDownRight, CornerLeftDown, CornerLeftUp, CornerRightDown, CornerRightUp, CornerUpLeft,
  CornerUpRight, Cpu, CreditCardIcon, Crop, Crosshair, Database, Delete, Disc, DollarSign, Download,
  DownloadCloud, Droplet, Edit, Edit2, Edit3, ExternalLink, Eye, EyeOff, FastForward, Feather, File, FileMinus,
  FilePlus, FileText, Film, Filter, Flag, Folder, FolderMinus, FolderPlus, Framer, Frown, Gift, GitBranch,
  GitCommit, GitMerge, GitPullRequest, Grid, HardDrive, Hash, Headphones, HelpCircle, Hexagon, Inbox, Info,
  Key, Layers, Layout, LifeBuoy, Link2, List, Loader, Lock, LogIn, LogOut, Maximize, Maximize2, Mic, MicOff,
  Minimize, Minimize2, Minus, MinusCircle, MinusSquare, Monitor, Moon, MoreHorizontal, MoreVertical, MousePointer,
  Move, Octagon, Package, Paperclip, PauseCircle, PenTool, Percent, PhoneCall, PhoneForwarded, PhoneIncoming,
  PhoneMissed, PhoneOff, PhoneOutgoing, PieChart, PlayCircle, Plus, PlusCircle, PlusSquare, Pocket, Power,
  Printer, Radio, RefreshCcw, RefreshCw, Repeat, Rewind, RotateCcw, RotateCw, Rss, Save, Scissors, Search,
  Server, Settings, Share, Share2, Shield, ShieldOff, ShoppingBagIcon, ShoppingCartIcon, Shuffle, SkipBack, SkipForward,
  Slack, Slash, Sliders, SmartphoneIcon, Smile, Speaker, Square, StopCircle, Sun, Sunrise, Sunset, Tablet, Tag,
  Target, Terminal, Thermometer, ThumbsDown, ThumbsUp, ToggleLeft, ToggleRight, Trash, Trash2, Trello,
  TrendingDown, TrendingUp, Triangle, Truck, Tv, Type, Umbrella, Underline, Unlock, Upload, UploadCloud,
  UserCheck, UserMinus, UserPlus, UsersIcon, VideoOff, Voicemail, Volume, Volume1, Volume2, VolumeX, Watch, Wifi,
  WifiOff, Wind, XCircle, XOctagon, XSquare, YoutubeIcon, ZapOff, ZoomIn, ZoomOut,
  
  // FontAwesome
  FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaTiktok, FaSnapchat, FaDiscord,
  FaTwitch, FaPinterest, FaSpotify, FaSoundcloud, FaApple, FaAndroid, FaWindows, FaLinux,
  FaGithub, FaGitlab, FaBitbucket, FaSlack, FaTrello, FaFigma, FaSketch, FaInvision,
  FaStripe, FaPaypal, FaAmazon, FaGoogle, FaMicrosoft, FaReddit, FaWhatsapp, FaTelegram,
  FaViber, FaLine, FaWeixin, FaVk, FaOdnoklassniki, FaYandex, FaYahoo,
  FaBitcoin, FaEthereum, FaWallet, FaGamepad, FaRobot, FaGhost,

  // SimpleIcons
  SiX, SiMastodon, SiThreads, SiPatreon, SiMedium, SiSubstack, SiKofi, SiBuymeacoffee,
  SiLinktree, SiNotion, SiObsidian, SiEvernote, SiDropbox, SiGooglecloud,
  SiAmazon, SiFirebase, SiSupabase, SiVercel, SiNetlify, SiHeroku, SiDigitalocean
};
