import React, { useState, useEffect } from 'react';
import { TEAM_MEMBERS } from '../data/mockData';
import { TeamMember } from '../types';
import { User, Plus, Camera, Edit2, Check, X } from 'lucide-react';

const STORAGE_KEY = 'bosstycoon_team_members_v20';

export const TeamSection: React.FC = () => {
  const [members, setMembers] = useState<TeamMember[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge with default roles/bios/images/names to keep up-to-date
          return TEAM_MEMBERS.map((defaultMember) => {
            const matched = parsed.find((p: TeamMember) => p.id === defaultMember.id);
            return matched
              ? {
                  ...defaultMember,
                  name: matched.name && matched.name.trim() !== '' ? matched.name : defaultMember.name,
                  image: matched.image && matched.image.trim() !== '' ? matched.image : defaultMember.image,
                }
              : defaultMember;
          });
        }
      }
    } catch {
      // Fallback on error
    }
    return TEAM_MEMBERS;
  });

  const [editingNameId, setEditingNameId] = useState<string | null>(null);
  const [tempName, setTempName] = useState('');
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Persist to localStorage whenever members state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
    } catch {
      // Ignore quota errors gracefully
    }
  }, [members]);

  const triggerSavedFeedback = (msg = 'Changes saved successfully') => {
    setSaveStatus(msg);
    setTimeout(() => setSaveStatus(null), 3500);
  };

  const resetDefaults = () => {
    setMembers(TEAM_MEMBERS);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(TEAM_MEMBERS));
    } catch {
      // Ignore
    }
    triggerSavedFeedback('Reset to default team profiles');
  };

  const handleImageUpload = (id: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setMembers((prev) =>
          prev.map((m) => (m.id === id ? { ...m, image: e.target?.result as string } : m))
        );
        triggerSavedFeedback('Photo updated and saved');
      }
    };
    reader.readAsDataURL(file);
  };

  const startEditName = (member: TeamMember) => {
    setEditingNameId(member.id);
    setTempName(member.name);
  };

  const saveName = (id: string) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, name: tempName.trim() } : m))
    );
    setEditingNameId(null);
    triggerSavedFeedback('Member name saved');
  };

  const removeImage = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, image: '' } : m))
    );
    triggerSavedFeedback('Photo removed and saved');
  };

  return (
    <section id="team" className="py-20 md:py-32 bg-[#0A0C0B] text-[#F5F5F4] relative overflow-hidden border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141716] border border-white/10 text-[#C6FF00] text-xs font-extrabold uppercase tracking-widest">
            <span>✦</span>
            <span>THE PEOPLE BEHIND THE RESULTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase italic leading-tight">
            Meet Our <br className="hidden sm:inline" />
            <span className="text-[#C6FF00] not-italic">Lead Team</span>
          </h2>
          <p className="text-sm sm:text-base text-white/60 font-light max-w-xl mx-auto leading-relaxed">
            Our team brings not just many years of experience, but relevant and contemporary experience in an ever-changing AI and marketing world.
          </p>
        </div>

        {/* 2 Team Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-8 sm:gap-10">
          {members.map((member, index) => {
            const isLead = index === 0;
            const isEditingName = editingNameId === member.id;

            return (
              <div
                key={member.id}
                className={`rounded-[36px] overflow-hidden bg-[#141716] border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_35px_rgba(198,255,0,0.15)] group flex flex-col justify-between ${
                  isLead ? 'border-[#C6FF00]/60 ring-1 ring-[#C6FF00]/40' : 'border-white/10 hover:border-[#C6FF00]/50'
                }`}
              >
                {/* Photo / Photo Placeholder Area */}
                <div className="aspect-[4/5] overflow-hidden bg-[#0D0F0E] relative flex flex-col items-center justify-center">
                  <input
                    type="file"
                    id={`team-photo-input-${member.id}`}
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(member.id, file);
                    }}
                  />

                  {member.image ? (
                    <>
                      <img
                        src={member.image}
                        alt={member.name || 'Team member photo'}
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C0B]/90 via-transparent to-transparent" />
                      
                      {/* Change / Remove Photo Buttons on Hover */}
                      <div className="absolute top-4 right-4 z-30 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <label
                          htmlFor={`team-photo-input-${member.id}`}
                          className="w-8 h-8 rounded-full bg-[#0A0C0B]/80 hover:bg-[#C6FF00] text-white hover:text-[#0A0C0B] flex items-center justify-center transition-colors border border-white/20 cursor-pointer shadow-lg"
                          title="Change Photo"
                        >
                          <Camera className="w-3.5 h-3.5" />
                        </label>
                        <button
                          onClick={(e) => removeImage(member.id, e)}
                          className="w-8 h-8 rounded-full bg-[#0A0C0B]/80 hover:bg-red-500 text-white flex items-center justify-center transition-colors border border-white/20 cursor-pointer shadow-lg"
                          title="Remove Photo"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </>
                  ) : (
                    /* High-end Minimalist Photo Placeholder Slot */
                    <label
                      htmlFor={`team-photo-input-${member.id}`}
                      className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-[#141716] to-[#0A0C0B] relative overflow-hidden group-hover:bg-[#181C1A] transition-colors cursor-pointer"
                    >
                      {/* Subtle geometric background grid */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]" />
                      
                      <div className="relative z-10 flex flex-col items-center space-y-4">
                        <div className="w-20 h-20 rounded-2xl bg-[#1B1F1D] border border-dashed border-white/25 flex items-center justify-center text-white/40 group-hover:text-[#C6FF00] group-hover:border-[#C6FF00] group-hover:bg-[#C6FF00]/5 transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                          <User className="w-9 h-9 stroke-[1.5]" />
                        </div>
                        <div className="space-y-1">
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-widest text-white/70 group-hover:text-[#C6FF00] transition-colors">
                            <Plus className="w-3.5 h-3.5" /> Add Member Photo
                          </span>
                          <p className="text-[10px] text-white/40 font-mono tracking-tight">
                            Click to upload portrait (4:5)
                          </p>
                        </div>
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-t from-[#141716] via-transparent to-transparent pointer-events-none" />
                    </label>
                  )}

                  {/* Specialty Badge */}
                  <div className="absolute top-4 left-4 z-20 pointer-events-none">
                    <span className="bg-[#0A0C0B]/90 backdrop-blur-md text-[#C6FF00] text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border border-white/10">
                      {member.specialty}
                    </span>
                  </div>
                </div>

                {/* Info Footer */}
                <div className="p-6 sm:p-7 space-y-2.5 bg-[#141716]">
                  
                  {/* Name Space */}
                  {isEditingName ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        autoFocus
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') saveName(member.id);
                          if (e.key === 'Escape') setEditingNameId(null);
                        }}
                        placeholder="Enter member name..."
                        className="w-full bg-[#1E2220] border border-[#C6FF00] rounded-lg px-3 py-1.5 text-sm text-white font-bold focus:outline-none"
                      />
                      <button
                        onClick={() => saveName(member.id)}
                        className="p-2 rounded-lg bg-[#C6FF00] text-[#0A0C0B] hover:bg-[#b2e600] transition-colors"
                        title="Save"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => startEditName(member)}
                      className="group/name flex items-center justify-between cursor-pointer py-0.5 rounded transition-colors"
                      title="Click to edit name"
                    >
                      {member.name ? (
                        <h3 className="text-xl font-black text-white uppercase tracking-tight group-hover/name:text-[#C6FF00] transition-colors">
                          {member.name}
                        </h3>
                      ) : (
                        <div className="flex items-center gap-2 text-white/40 group-hover/name:text-[#C6FF00] transition-colors">
                          <span className="font-mono text-sm uppercase tracking-wider font-semibold border-b border-dashed border-white/20 pb-0.5">
                            [ Team Member Name ]
                          </span>
                          <Edit2 className="w-3.5 h-3.5 opacity-60 group-hover/name:opacity-100" />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Role Space */}
                  <p className="text-xs font-black text-[#C6FF00] uppercase tracking-widest">
                    {member.role}
                  </p>

                  {/* Bio Space */}
                  <p className="text-xs text-white/60 leading-relaxed font-light pt-1">
                    {member.bio}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
