import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, Plus, Trash2, CheckCircle2, XCircle, AlertCircle, 
  Tv, Monitor, LayoutDashboard, Film, BarChart3, Shield, Users, 
  Upload, Calendar, RefreshCw, Radio, MapPin, Clock, Eye, Activity, 
  Settings, Check, Search, Filter, Maximize, ExternalLink, HardDrive, Sparkles
} from 'lucide-react';

// --- MOCK DATA SEED ---
const INITIAL_VIDEOS = [
  {
    id: 'vid-1',
    title: 'Summer Sale Promo 2026',
    duration: 15,
    size: '14.2 MB',
    resolution: '1080p (1920x1080)',
    status: 'approved',
    tags: ['Retail', 'Malls', 'Lobby'],
    createdAt: '2026-10-12',
    color1: '#0ea5e9',
    color2: '#6366f1',
    accentText: 'SUMMER DISCOUNTS UP TO 50% OFF'
  },
  {
    id: 'vid-2',
    title: 'Aura Fitness Cyber Commercial',
    duration: 10,
    size: '9.8 MB',
    resolution: '1080p (1920x1080)',
    status: 'approved',
    tags: ['Gyms', 'Sports'],
    createdAt: '2026-10-18',
    color1: '#ec4899',
    color2: '#8b5cf6',
    accentText: 'JOIN AURA FITNESS TODAY'
  },
  {
    id: 'vid-3',
    title: 'EcoDrive EV Announcement',
    duration: 20,
    size: '22.1 MB',
    resolution: '4K (3840x2160)',
    status: 'pending',
    tags: ['Transit', 'Outdoor', 'Gas Station'],
    createdAt: '2026-10-25',
    color1: '#10b981',
    color2: '#06b6d4',
    accentText: 'THE FUTURE OF ELECTRIC MOBILITY'
  }
];

const INITIAL_CAMPAIGNS = [
  {
    id: 'cmp-1',
    name: 'Q4 Retail Blitz',
    startDate: '2026-10-01',
    endDate: '2026-11-30',
    assignedVideos: ['vid-1'],
    targetLocations: ['Downtown Mall', 'Airport Terminal B'],
    frequency: 'High (Every 3 mins)',
    status: 'active',
    impressions: 48920,
    completionRate: 96.4
  },
  {
    id: 'cmp-2',
    name: 'Aura Fitness New Year Warmup',
    startDate: '2026-10-15',
    endDate: '2026-12-15',
    assignedVideos: ['vid-2'],
    targetLocations: ['Metro Gym Network', 'Lobby Display #4'],
    frequency: 'Medium (Every 10 mins)',
    status: 'active',
    impressions: 18340,
    completionRate: 98.1
  }
];

const INITIAL_SCREENS = [
  { id: 'scr-101', code: 'RNI-8492', name: 'Downtown Mall Main Entrance', location: 'New York, NY', status: 'online', currentPlaying: 'Summer Sale Promo 2026', ping: '12ms', type: 'Kiosk' },
  { id: 'scr-102', code: 'RNI-2910', name: 'JFK Airport Terminal 2 Lobby', location: 'Queens, NY', status: 'online', currentPlaying: 'Summer Sale Promo 2026', ping: '24ms', type: 'Wall Display' },
  { id: 'scr-103', code: 'RNI-9941', name: 'Aura Fitness Center Hub', location: 'Brooklyn, NY', status: 'online', currentPlaying: 'Aura Fitness Cyber Commercial', ping: '18ms', type: 'Tablet Bar' },
  { id: 'scr-104', code: 'RNI-1102', name: 'Times Square LED Billboard', location: 'New York, NY', status: 'offline', currentPlaying: 'None', ping: '—', type: 'Outdoor Billboard' },
];

export default function App() {
  // Navigation & Role State
  const [activeRole, setActiveRole] = useState('advertiser'); // 'advertiser' | 'player' | 'admin'
  const [activeTab, setActiveTab] = useState('dashboard'); // Advertiser: dashboard, videos, campaigns, analytics | Admin: overview, moderation, screens
  
  // App Data State
  const [videos, setVideos] = useState(INITIAL_VIDEOS);
  const [campaigns, setCampaigns] = useState(INITIAL_CAMPAIGNS);
  const [screens, setScreens] = useState(INITIAL_SCREENS);
  const [pairedScreenCode, setPairedScreenCode] = useState('RNI-8492');
  
  // New Video Form Modal / Drag-drop State
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [newVidTitle, setNewVidTitle] = useState('');
  const [newVidDuration, setNewVidDuration] = useState('15');
  const [newVidTag, setNewVidTag] = useState('Retail');

  // Pair Screen Modal
  const [showPairModal, setShowPairModal] = useState(false);
  const [pairingInputCode, setPairingInputCode] = useState('');
  const [pairingLocation, setPairingLocation] = useState('');

  // Analytics Stats counter simulation
  const [totalImpressions, setTotalImpressions] = useState(67260);

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalImpressions(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Video Upload Handler
  const handleSimulatedUpload = (e) => {
    e.preventDefault();
    if (!newVidTitle) return;

    setIsUploading(true);
    let prog = 0;
    const interval = setInterval(() => {
      prog += 20;
      setUploadProgress(prog);
      if (prog >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        
        const colors = [
          ['#8b5cf6', '#ec4899'],
          ['#06b6d4', '#3b82f6'],
          ['#f59e0b', '#ef4444'],
          ['#10b981', '#14b8a6']
        ];
        const randomPalette = colors[Math.floor(Math.random() * colors.length)];

        const newVid = {
          id: `vid-${Date.now()}`,
          title: newVidTitle,
          duration: parseInt(newVidDuration) || 15,
          size: '18.4 MB',
          resolution: '1080p (1920x1080)',
          status: 'pending',
          tags: [newVidTag],
          createdAt: new Date().toISOString().split('T')[0],
          color1: randomPalette[0],
          color2: randomPalette[1],
          accentText: newVidTitle.toUpperCase()
        };

        setVideos([newVid, ...videos]);
        setShowUploadModal(false);
        setUploadProgress(0);
        setNewVidTitle('');
      }
    }, 300);
  };

  // Screen Pair Handler
  const handlePairScreen = (e) => {
    e.preventDefault();
    if (!pairingInputCode) return;
    
    const newScr = {
      id: `scr-${Date.now()}`,
      code: pairingInputCode.toUpperCase(),
      name: pairingLocation || `Display ${pairingInputCode.toUpperCase()}`,
      location: 'Assigned Remote Site',
      status: 'online',
      currentPlaying: 'Synced Playlist',
      ping: '15ms',
      type: 'Smart Screen'
    };
    setScreens([...screens, newScr]);
    setPairedScreenCode(pairingInputCode.toUpperCase());
    setShowPairModal(false);
    setPairingInputCode('');
    setPairingLocation('');
  };

  // Moderation Actions
  const handleApproveVideo = (id) => {
    setVideos(videos.map(v => v.id === id ? { ...v, status: 'approved' } : v));
  };
  const handleRejectVideo = (id) => {
    setVideos(videos.map(v => v.id === id ? { ...v, status: 'rejected' } : v));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-sky-500 selection:text-white flex flex-col">
      {/* GLOBAL HEADER & ROLE SWITCHER */}
      <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-sky-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Tv className="w-5 h-5 text-sky-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-300">
                RONITEC
              </span>
              <span className="text-[10px] font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20 px-2 py-0.5 rounded-full uppercase tracking-widest">
                Ad Network v2.4
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">Digital Signage & Programmatic Video Broadcast</p>
          </div>
        </div>

        {/* ROLE SWITCHER PILL */}
        <div className="flex items-center bg-slate-950 border border-slate-800 rounded-full p-1 shadow-inner">
          <button
            onClick={() => { setActiveRole('advertiser'); setActiveTab('dashboard'); }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeRole === 'advertiser'
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Advertiser Portal</span>
          </button>

          <button
            onClick={() => setActiveRole('player')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeRole === 'player'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Kiosk Player</span>
          </button>

          <button
            onClick={() => { setActiveRole('admin'); setActiveTab('overview'); }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeRole === 'admin'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Admin Center</span>
          </button>
        </div>
      </header>

      {/* ROLE 1: ADVERTISER DASHBOARD */}
      {activeRole === 'advertiser' && (
        <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-4 md:p-6 gap-6">
          {/* NAVIGATION SIDEBAR */}
          <aside className="w-full md:w-64 bg-slate-900/50 border border-slate-800/80 rounded-2xl p-4 flex md:flex-col gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-sky-500/10 text-sky-400 border border-sky-500/30'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview Stats</span>
            </button>

            <button
              onClick={() => setActiveTab('videos')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'videos'
                  ? 'bg-sky-500/10 text-sky-400 border border-sky-500/30'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              <Film className="w-4 h-4" />
              <span>Video Assets</span>
              <span className="ml-auto text-xs bg-slate-800 px-2 py-0.5 rounded-full text-slate-300">
                {videos.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('campaigns')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'campaigns'
                  ? 'bg-sky-500/10 text-sky-400 border border-sky-500/30'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Campaign Manager</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'analytics'
                  ? 'bg-sky-500/10 text-sky-400 border border-sky-500/30'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Performance Analytics</span>
            </button>

            <div className="mt-auto pt-4 border-t border-slate-800 hidden md:block">
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-3 rounded-xl border border-slate-800">
                <p className="text-xs font-medium text-slate-400">Ad Credits Balance</p>
                <p className="text-xl font-bold text-sky-400 mt-1">$2,450.00</p>
                <button className="w-full mt-2 text-xs bg-sky-500 hover:bg-sky-400 text-white font-medium py-1.5 rounded-lg transition-all">
                  + Add Ad Budget
                </button>
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <main className="flex-1 space-y-6">
            {/* SUB-TAB 1: OVERVIEW DASHBOARD */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* TOP STATS CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-slate-900/60 border border-slate-800/80 p-5 rounded-2xl relative overflow-hidden group hover:border-sky-500/30 transition-all">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Total Impressions</p>
                        <h3 className="text-2xl font-bold text-white mt-1">{totalImpressions.toLocaleString()}</h3>
                      </div>
                      <div className="p-2.5 bg-sky-500/10 rounded-xl text-sky-400 border border-sky-500/20">
                        <Eye className="w-5 h-5" />
                      </div>
                    </div>
                    <span className="text-xs text-emerald-400 flex items-center gap-1 mt-3">
                      ↑ 14.2% <span className="text-slate-400">vs last week</span>
                    </span>
                  </div>

                  <div className="bg-slate-900/60 border border-slate-800/80 p-5 rounded-2xl relative overflow-hidden group hover:border-sky-500/30 transition-all">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Avg Completion Rate</p>
                        <h3 className="text-2xl font-bold text-white mt-1">97.2%</h3>
                      </div>
                      <div className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-400 border border-indigo-500/20">
                        <Activity className="w-5 h-5" />
                      </div>
                    </div>
                    <span className="text-xs text-emerald-400 flex items-center gap-1 mt-3">
                      ↑ 2.1% <span className="text-slate-400">high viewer retention</span>
                    </span>
                  </div>

                  <div className="bg-slate-900/60 border border-slate-800/80 p-5 rounded-2xl relative overflow-hidden group hover:border-sky-500/30 transition-all">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Active Campaigns</p>
                        <h3 className="text-2xl font-bold text-white mt-1">{campaigns.filter(c => c.status === 'active').length}</h3>
                      </div>
                      <div className="p-2.5 bg-cyan-500/10 rounded-xl text-cyan-400 border border-cyan-500/20">
                        <Radio className="w-5 h-5" />
                      </div>
                    </div>
                    <span className="text-xs text-slate-400 flex items-center gap-1 mt-3">
                      Broadcasting on 12 Screens
                    </span>
                  </div>

                  <div className="bg-slate-900/60 border border-slate-800/80 p-5 rounded-2xl relative overflow-hidden group hover:border-sky-500/30 transition-all">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Active Video Assets</p>
                        <h3 className="text-2xl font-bold text-white mt-1">{videos.length}</h3>
                      </div>
                      <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20">
                        <Film className="w-5 h-5" />
                      </div>
                    </div>
                    <span className="text-xs text-amber-400 flex items-center gap-1 mt-3">
                      {videos.filter(v => v.status === 'pending').length} pending approval
                    </span>
                  </div>
                </div>

                {/* UPLOAD HERO BANNER */}
                <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-sky-950/40 border border-sky-500/20 rounded-2xl p-6 relative overflow-hidden">
                  <div className="max-w-xl space-y-3">
                    <div className="inline-flex items-center gap-2 bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-medium">
                      <Sparkles className="w-3.5 h-3.5" /> Programmatic Video Distribution
                    </div>
                    <h2 className="text-2xl font-bold text-white">Broadcast Your Video Ads Across Thousands of Public Displays</h2>
                    <p className="text-sm text-slate-300">
                      Upload video creatives, configure targeted location playlists, and monitor live viewer playback metrics in real-time.
                    </p>
                    <div className="pt-2 flex flex-wrap gap-3">
                      <button
                        onClick={() => setShowUploadModal(true)}
                        className="bg-sky-500 hover:bg-sky-400 text-white font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-sky-500/25 transition-all text-sm"
                      >
                        <Upload className="w-4 h-4" /> Upload New Video Ad
                      </button>
                      <button
                        onClick={() => setShowPairModal(true)}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm transition-all"
                      >
                        <Monitor className="w-4 h-4 text-sky-400" /> Pair Display Screen
                      </button>
                    </div>
                  </div>
                </div>

                {/* RECENT CAMPAIGNS SUMMARY */}
                <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg text-white">Active Ad Campaigns</h3>
                    <button onClick={() => setActiveTab('campaigns')} className="text-xs text-sky-400 hover:underline">
                      View All
                    </button>
                  </div>
                  <div className="space-y-3">
                    {campaigns.map((cmp) => (
                      <div key={cmp.id} className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-slate-100">{cmp.name}</h4>
                            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase">
                              {cmp.status}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400">
                            Schedule: {cmp.startDate} to {cmp.endDate} • Target: {cmp.targetLocations.join(', ')}
                          </p>
                        </div>
                        <div className="flex items-center gap-6">
                          <div>
                            <p className="text-[10px] uppercase text-slate-400 font-semibold">Impressions</p>
                            <p className="font-mono text-sm text-sky-400 font-bold">{cmp.impressions.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase text-slate-400 font-semibold">Retention</p>
                            <p className="font-mono text-sm text-emerald-400 font-bold">{cmp.completionRate}%</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SUB-TAB 2: VIDEO ASSETS MANAGEMENT */}
            {activeTab === 'videos' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Video Creatives Vault</h2>
                    <p className="text-xs text-slate-400">Manage video ad media files, target tags, and moderation status.</p>
                  </div>
                  <button
                    onClick={() => setShowUploadModal(true)}
                    className="bg-sky-500 hover:bg-sky-400 text-white font-semibold px-4 py-2 rounded-xl flex items-center gap-2 text-sm shadow-md shadow-sky-500/20 transition-all"
                  >
                    <Upload className="w-4 h-4" /> Upload Video Asset
                  </button>
                </div>

                {/* VIDEO GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videos.map((vid) => (
                    <div key={vid.id} className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden flex flex-col group hover:border-sky-500/40 transition-all">
                      {/* SIMULATED CANVAS/THUMBNAIL PREVIEW */}
                      <div className="relative aspect-video bg-slate-950 flex items-center justify-center border-b border-slate-800 overflow-hidden">
                        <SimulatedVideoCanvas vid={vid} isThumbnail={true} />
                        <div className="absolute top-2 right-2">
                          {vid.status === 'approved' && (
                            <span className="bg-emerald-500/80 backdrop-blur text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
                              <CheckCircle2 className="w-3 h-3" /> Approved
                            </span>
                          )}
                          {vid.status === 'pending' && (
                            <span className="bg-amber-500/80 backdrop-blur text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
                              <AlertCircle className="w-3 h-3" /> Under Review
                            </span>
                          )}
                          {vid.status === 'rejected' && (
                            <span className="bg-red-500/80 backdrop-blur text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
                              <XCircle className="w-3 h-3" /> Rejected
                            </span>
                          )}
                        </div>
                        <span className="absolute bottom-2 right-2 bg-slate-950/80 text-slate-300 font-mono text-xs px-2 py-0.5 rounded border border-slate-700/80">
                          {vid.duration}s
                        </span>
                      </div>

                      {/* DETAILS */}
                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <h4 className="font-bold text-slate-100 group-hover:text-sky-400 transition-colors">{vid.title}</h4>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {vid.tags.map((t, idx) => (
                              <span key={idx} className="bg-slate-800 text-slate-300 text-[10px] font-medium px-2 py-0.5 rounded-md">
                                #{t}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-800/80 text-xs text-slate-400 space-y-1">
                          <div className="flex justify-between">
                            <span>Format & Res:</span>
                            <span className="font-mono text-slate-300">{vid.resolution}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>File Size:</span>
                            <span className="font-mono text-slate-300">{vid.size}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SUB-TAB 3: CAMPAIGN MANAGER */}
            {activeTab === 'campaigns' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Campaign Scheduler</h2>
                    <p className="text-xs text-slate-400">Deploy video assets to screen fleets with playback frequencies.</p>
                  </div>
                  <button className="bg-sky-500 hover:bg-sky-400 text-white font-semibold px-4 py-2 rounded-xl flex items-center gap-2 text-sm shadow-md transition-all">
                    <Plus className="w-4 h-4" /> Create Campaign
                  </button>
                </div>

                <div className="space-y-4">
                  {campaigns.map((cmp) => (
                    <div key={cmp.id} className="bg-slate-900/70 border border-slate-800 p-5 rounded-2xl space-y-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="font-bold text-lg text-white">{cmp.name}</h3>
                            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-medium px-2.5 py-0.5 rounded-full">
                              Active Loop
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-sky-400" />
                            {cmp.startDate} — {cmp.endDate}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-400">Frequency:</span>
                          <span className="bg-slate-800 text-sky-300 text-xs font-semibold px-3 py-1 rounded-lg border border-slate-700">
                            {cmp.frequency}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Assigned Video Creatives</p>
                          <div className="space-y-2">
                            {cmp.assignedVideos.map(vidId => {
                              const vidObj = videos.find(v => v.id === vidId);
                              return (
                                <div key={vidId} className="flex items-center justify-between bg-slate-900 p-2 rounded-lg text-xs">
                                  <span className="font-medium text-slate-200">{vidObj ? vidObj.title : vidId}</span>
                                  <span className="text-slate-400">{vidObj ? `${vidObj.duration}s` : '15s'}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Target Locations</p>
                          <div className="flex flex-wrap gap-2">
                            {cmp.targetLocations.map((loc, i) => (
                              <span key={i} className="bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs px-2.5 py-1 rounded-lg flex items-center gap-1">
                                <MapPin className="w-3 h-3" /> {loc}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SUB-TAB 4: ANALYTICS */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">Broadcast Analytics</h2>
                  <p className="text-xs text-slate-400">Real-time impression count, hourly playback metrics, and device logs.</p>
                </div>

                {/* GRAPH VISUALIZATION */}
                <div className="bg-slate-900/70 border border-slate-800 p-6 rounded-2xl space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-slate-200 text-sm">Hourly Video Ad Impressions (24h)</h3>
                    <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Live Stream Log
                    </span>
                  </div>

                  {/* BAR CHART SIMULATION */}
                  <div className="h-48 flex items-end justify-between gap-2 pt-6 pb-2 border-b border-slate-800">
                    {[35, 42, 28, 65, 80, 95, 110, 85, 70, 90, 120, 140, 160, 135, 125, 150, 180, 210, 190, 175, 160, 140, 110, 95].map((val, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-2 group relative">
                        {/* Tooltip */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-slate-800 text-sky-400 font-mono text-[10px] px-2 py-0.5 rounded border border-slate-700 pointer-events-none z-10 whitespace-nowrap">
                          {val * 25} views
                        </div>
                        <div
                          style={{ height: `${(val / 210) * 100}%` }}
                          className="w-full bg-gradient-to-t from-sky-600 to-cyan-400 rounded-t group-hover:from-sky-400 group-hover:to-cyan-300 transition-all"
                        ></div>
                        <span className="text-[9px] font-mono text-slate-500 hidden sm:block">
                          {idx % 4 === 0 ? `${idx}:00` : ''}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between text-xs text-slate-400 pt-2">
                    <span>00:00 AM</span>
                    <span>12:00 PM</span>
                    <span>23:59 PM</span>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      )}

      {/* ROLE 2: KIOSK DISPLAY SCREEN / FULLSCREEN PLAYER MODE */}
      {activeRole === 'player' && (
        <FullscreenKioskPlayer
          pairedCode={pairedScreenCode}
          videos={videos.filter(v => v.status === 'approved')}
        />
      )}

      {/* ROLE 3: ADMIN CONTROL CENTER */}
      {activeRole === 'admin' && (
        <div className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/60 border border-slate-800 p-6 rounded-2xl">
            <div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-indigo-400" />
                <h2 className="text-xl font-bold text-white">Ronitec Central Operations Center</h2>
              </div>
              <p className="text-xs text-slate-400 mt-1">Network moderation, fleet telemetry, and user management platform.</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-full font-mono flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Network Health: 99.98%
              </span>
            </div>
          </div>

          {/* ADMIN SUB TABS */}
          <div className="flex border-b border-slate-800 gap-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 text-sm font-semibold transition-all border-b-2 ${
                activeTab === 'overview'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Ad Moderation Queue
            </button>
            <button
              onClick={() => setActiveTab('screens')}
              className={`pb-3 text-sm font-semibold transition-all border-b-2 ${
                activeTab === 'screens'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Display Fleet Manager ({screens.length})
            </button>
          </div>

          {/* TAB 1: AD MODERATION */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-slate-200">Pending Creative Moderation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((vid) => (
                  <div key={vid.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4">
                    <div className="relative aspect-video bg-slate-950 rounded-xl overflow-hidden border border-slate-800">
                      <SimulatedVideoCanvas vid={vid} isThumbnail={true} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-100">{vid.title}</h4>
                      <p className="text-xs text-slate-400">Duration: {vid.duration}s • Format: {vid.resolution}</p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full uppercase ${
                        vid.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400' :
                        vid.status === 'pending' ? 'bg-amber-500/10 text-amber-400' : 'bg-red-500/10 text-red-400'
                      }`}>
                        {vid.status}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleApproveVideo(vid.id)}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white p-2 rounded-lg text-xs flex items-center gap-1 transition-all"
                          title="Approve Video"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleRejectVideo(vid.id)}
                          className="bg-red-600 hover:bg-red-500 text-white p-2 rounded-lg text-xs flex items-center gap-1 transition-all"
                          title="Reject Video"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: DISPLAY FLEET MANAGER */}
          {activeTab === 'screens' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg text-slate-200">Connected Screen Terminals</h3>
                <button
                  onClick={() => setShowPairModal(true)}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2 rounded-xl text-xs flex items-center gap-2 shadow transition-all"
                >
                  <Plus className="w-4 h-4" /> Pair New Screen
                </button>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-950 text-slate-400 text-xs font-semibold uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-4">Pairing Code</th>
                      <th className="p-4">Screen Name</th>
                      <th className="p-4">Location</th>
                      <th className="p-4">Currently Playing</th>
                      <th className="p-4">Status & Latency</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {screens.map((scr) => (
                      <tr key={scr.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-4 font-mono font-bold text-sky-400">{scr.code}</td>
                        <td className="p-4 font-medium text-slate-100">{scr.name}</td>
                        <td className="p-4 text-xs text-slate-400">{scr.location}</td>
                        <td className="p-4 text-xs font-medium text-slate-200">{scr.currentPlaying}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span className={`w-2.5 h-2.5 rounded-full ${scr.status === 'online' ? 'bg-emerald-400 animate-pulse' : 'bg-red-500'}`}></span>
                            <span className="capitalize text-xs font-medium">{scr.status}</span>
                            <span className="text-[10px] text-slate-500 font-mono ml-1">({scr.ping})</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* UPLOAD MODAL */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setShowUploadModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              ✕
            </button>
            <div>
              <h3 className="text-xl font-bold text-white">Upload Video Creative</h3>
              <p className="text-xs text-slate-400 mt-1">Accepts MP4, WebM formats (Max 100MB, 1080p/4K resolution).</p>
            </div>

            <form onSubmit={handleSimulatedUpload} className="space-y-4">
              <div className="border-2 border-dashed border-slate-700 hover:border-sky-500/50 rounded-xl p-6 text-center bg-slate-950/40 space-y-2 transition-all cursor-pointer">
                <Upload className="w-8 h-8 text-sky-400 mx-auto" />
                <p className="text-sm font-medium text-slate-200">Drag & drop video file here or browse</p>
                <p className="text-[10px] text-slate-500">Supports 16:9 widescreen or 9:16 vertical displays</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Ad Title</label>
                <input
                  type="text"
                  value={newVidTitle}
                  onChange={(e) => setNewVidTitle(e.target.value)}
                  placeholder="e.g. Autumn Special Deal 15s"
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Duration (sec)</label>
                  <select
                    value={newVidDuration}
                    onChange={(e) => setNewVidDuration(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-sky-500"
                  >
                    <option value="10">10 Seconds</option>
                    <option value="15">15 Seconds</option>
                    <option value="20">20 Seconds</option>
                    <option value="30">30 Seconds</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Target Category</label>
                  <select
                    value={newVidTag}
                    onChange={(e) => setNewVidTag(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-sky-500"
                  >
                    <option value="Retail">Retail & Malls</option>
                    <option value="Gyms">Fitness & Gyms</option>
                    <option value="Transit">Transit & Airports</option>
                    <option value="Outdoor">Outdoor Billboards</option>
                  </select>
                </div>
              </div>

              {isUploading && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-sky-400 font-mono">
                    <span>Encoding & Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                    <div style={{ width: `${uploadProgress}%` }} className="h-full bg-sky-500 transition-all duration-300"></div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isUploading}
                className="w-full bg-sky-500 hover:bg-sky-400 text-white font-semibold py-2.5 rounded-xl shadow-lg shadow-sky-500/20 transition-all text-sm"
              >
                {isUploading ? 'Processing Asset...' : 'Confirm Upload'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* SCREEN PAIRING MODAL */}
      {showPairModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setShowPairModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              ✕
            </button>
            <div>
              <h3 className="text-xl font-bold text-white">Pair Remote Display Screen</h3>
              <p className="text-xs text-slate-400 mt-1">Enter the 6-digit code shown on the screen's pairing interface.</p>
            </div>

            <form onSubmit={handlePairScreen} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Pairing Code</label>
                <input
                  type="text"
                  value={pairingInputCode}
                  onChange={(e) => setPairingInputCode(e.target.value)}
                  placeholder="e.g. RNI-8492"
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 font-mono tracking-widest text-center uppercase focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Display Name / Location</label>
                <input
                  type="text"
                  value={pairingLocation}
                  onChange={(e) => setPairingLocation(e.target.value)}
                  placeholder="e.g. West Wing Escalator Display"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-sky-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-xl shadow-lg transition-all text-sm"
              >
                Link Screen Terminal
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// FULLSCREEN GAPLESS KIOSK DISPLAY COMPONENT
// ==========================================
function FullscreenKioskPlayer({ pairedCode, videos }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playbackTime, setPlaybackTime] = useState(0);
  const [impressionLogged, setImpressionLogged] = useState(0);
  const [isPrebufferingNext, setIsPrebufferingNext] = useState(false);

  const currentVid = videos[currentIndex] || INITIAL_VIDEOS[0];
  const nextVid = videos[(currentIndex + 1) % videos.length] || INITIAL_VIDEOS[0];

  useEffect(() => {
    setPlaybackTime(0);
    setImpressionLogged(prev => prev + 1);

    const interval = setInterval(() => {
      setPlaybackTime(prev => {
        if (prev + 1 >= currentVid.duration - 2) {
          setIsPrebufferingNext(true); // Gapless simulation indicator
        }
        if (prev + 1 >= currentVid.duration) {
          setIsPrebufferingNext(false);
          setCurrentIndex((currentIndex + 1) % videos.length);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentIndex, videos, currentVid.duration]);

  return (
    <div className="flex-1 relative bg-black flex flex-col justify-between overflow-hidden select-none min-h-[calc(100vh-65px)]">
      {/* SIMULATED FULLSCREEN VIDEO CANVAS */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <SimulatedVideoCanvas vid={currentVid} isThumbnail={false} />
      </div>

      {/* TOP KIOSK HEADER OVERLAY */}
      <div className="relative z-10 p-6 flex justify-between items-start bg-gradient-to-b from-black/80 via-black/30 to-transparent">
        <div className="flex items-center gap-3">
          <div className="bg-sky-500/20 backdrop-blur-md border border-sky-500/40 text-sky-300 px-3 py-1.5 rounded-xl font-mono text-xs font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            SCREEN ID: {pairedCode}
          </div>
          <span className="text-xs font-medium text-slate-300 bg-black/40 backdrop-blur px-3 py-1.5 rounded-xl border border-white/10">
            Ronitec Player Engine v2.4 (Continuous Sync)
          </span>
        </div>

        <div className="flex items-center gap-3">
          {isPrebufferingNext && (
            <span className="text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 px-3 py-1.5 rounded-xl font-mono flex items-center gap-2 animate-pulse">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Seamless Pre-buffering Next Ad...
            </span>
          )}
          <span className="bg-black/60 backdrop-blur text-white text-xs px-3 py-1.5 rounded-xl border border-white/10 font-mono">
            Log ID: #{10823 + impressionLogged}
          </span>
        </div>
      </div>

      {/* BOTTOM DISPLAY HUD */}
      <div className="relative z-10 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent space-y-3">
        <div className="flex justify-between items-end">
          <div className="space-y-1 max-w-lg">
            <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 rounded">
              Now Broadcasting
            </span>
            <h1 className="text-3xl font-extrabold text-white tracking-tight drop-shadow-md">{currentVid.title}</h1>
            <p className="text-xs text-slate-300">Target Segment: {currentVid.tags?.join(', ')}</p>
          </div>

          <div className="text-right space-y-1">
            <p className="text-xs text-slate-400">Up Next:</p>
            <p className="text-sm font-semibold text-slate-200">{nextVid.title}</p>
          </div>
        </div>

        {/* TIME BAR */}
        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden backdrop-blur">
          <div
            style={{ width: `${(playbackTime / currentVid.duration) * 100}%` }}
            className="h-full bg-gradient-to-r from-sky-500 to-cyan-400 transition-all duration-1000 ease-linear"
          ></div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// SIMULATED CANVAS GRAPHICS GENERATOR FOR ADS
// ==========================================
function SimulatedVideoCanvas({ vid, isThumbnail }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = isThumbnail ? 320 : 1280);
    let height = (canvas.height = isThumbnail ? 180 : 720);

    let angle = 0;

    const render = () => {
      angle += 0.02;

      // Dynamic Gradient Background
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, vid.color1 || '#0ea5e9');
      grad.addColorStop(1, vid.color2 || '#6366f1');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Animated Background Circles
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.beginPath();
      ctx.arc(
        width / 2 + Math.cos(angle) * (width * 0.2),
        height / 2 + Math.sin(angle) * (height * 0.2),
        width * 0.25,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // Main Animated Text Overlay
      ctx.save();
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${isThumbnail ? '16px' : '42px'} sans-serif`;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
      ctx.shadowBlur = 12;

      ctx.fillText(vid.accentText || vid.title, width / 2, height / 2);

      // Animated Subtitle / Badge
      ctx.font = `${isThumbnail ? '10px' : '20px'} sans-serif`;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.fillText(`RONITEC HIGH RESOLUTION STREAM`, width / 2, height / 2 + (isThumbnail ? 25 : 55));
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [vid, isThumbnail]);

  return <canvas ref={canvasRef} className="w-full h-full object-cover" />;
}