import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Clock, Calendar as CalendarIcon, CheckCircle2, User, Sparkles, ArrowRight } from 'lucide-react';

export const MarketingSurveyCalendar: React.FC = () => {
  // Calendar state - default to October 2026
  const [currentDate, setCurrentDate] = useState(() => new Date(2026, 9, 1));
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date(2026, 9, 26));
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Attendee state
  const [attendee, setAttendee] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Calculate calendar days
  const calendarDays = useMemo(() => {
    const firstDayIndex = new Date(year, month, 1).getDay(); // 0 is Sunday
    const totalDays = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    const days = [];

    // Previous month filler days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      days.push({
        dayNumber: prevMonthDays - i,
        isCurrentMonth: false,
        date: new Date(year, month - 1, prevMonthDays - i)
      });
    }

    // Current month days
    for (let i = 1; i <= totalDays; i++) {
      days.push({
        dayNumber: i,
        isCurrentMonth: true,
        date: new Date(year, month, i)
      });
    }

    // Next month filler days to complete rows (up to 35 or 42)
    const remaining = (7 - (days.length % 7)) % 7;
    for (let i = 1; i <= remaining; i++) {
      days.push({
        dayNumber: i,
        isCurrentMonth: false,
        date: new Date(year, month + 1, i)
      });
    }

    return days;
  }, [year, month]);

  // Available slots logic based on day of week
  const availableSlots = useMemo(() => {
    const dayOfWeek = selectedDate.getDay();
    // Sunday: no slots
    if (dayOfWeek === 0) return [];
    
    // Check if it's the 26th of October 2026 - allow slots so user can experience booking
    if (dayOfWeek === 6) {
      // Saturday
      return ['10:00 AM', '12:30 PM', '02:30 PM'];
    }
    // Weekdays
    return ['09:30 AM', '11:00 AM', '01:30 PM', '03:00 PM', '04:30 PM'];
  }, [selectedDate]);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const isSameDay = (d1: Date, d2: Date) => {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const formatSelectedDateHeading = () => {
    return selectedDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!attendee.name.trim() || !attendee.email.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setBookingConfirmed(true);
    }, 600);
  };

  const resetBooking = () => {
    setBookingConfirmed(false);
    setSelectedTime(null);
    setAttendee({ name: '', email: '', phone: '', notes: '' });
  };

  return (
    <div className="bg-[#141716] p-6 sm:p-8 rounded-[36px] border border-white/10 shadow-2xl relative overflow-hidden flex flex-col justify-between">
      {/* Background radial accent glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#C6FF00]/5 blur-3xl rounded-full pointer-events-none -z-10" />

      {/* Header Info */}
      <div className="space-y-2 mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E2220] border border-white/10 text-[#C6FF00] text-[10px] font-black uppercase tracking-widest">
          <Clock className="w-3 h-3 text-[#C6FF00]" />
          <span>30 MINUTE MARKETING SURVEY</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase">
          Book With <span className="text-[#C6FF00]">Adam Kelley</span>
        </h3>
        <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed">
          Book a session with Adam Kelley to discuss where your business is at today and map a plan to scale to the next level.
        </p>
      </div>

      {bookingConfirmed ? (
        /* Confirmed State */
        <div className="py-8 px-4 text-center space-y-5 animate-in fade-in duration-300">
          <div className="w-16 h-16 rounded-full bg-[#C6FF00] text-[#0A0C0B] mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(198,255,0,0.4)]">
            <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold text-[#C6FF00] uppercase tracking-widest">Session Confirmed</span>
            <h4 className="text-2xl font-black text-white uppercase tracking-tight">You&apos;re On The Calendar!</h4>
            <p className="text-xs text-white/70 max-w-sm mx-auto font-light leading-relaxed pt-1">
              We&apos;ve sent calendar invites and preparation guidelines to <span className="text-white font-semibold">{attendee.email || 'your email'}</span>.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#0A0C0B] border border-white/10 max-w-sm mx-auto text-left space-y-2">
            <div className="flex items-center gap-2 text-xs text-[#C6FF00] font-black uppercase tracking-wider">
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>{formatSelectedDateHeading()}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-white font-bold">
              <Clock className="w-3.5 h-3.5 text-white/60" />
              <span>{selectedTime} (30 mins)</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/60">
              <User className="w-3.5 h-3.5" />
              <span>Host: Adam Kelley (Lead CS / AI Specialist)</span>
            </div>
          </div>

          <button
            onClick={resetBooking}
            className="px-6 py-2.5 rounded-full bg-[#1E2220] hover:bg-[#282D2A] text-white hover:text-[#C6FF00] text-xs font-bold uppercase tracking-wider transition-colors border border-white/10 cursor-pointer"
          >
            Book Another Time
          </button>
        </div>
      ) : (
        /* Interactive Calendar + Times Layout */
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#0A0C0B]/90 p-4 sm:p-5 rounded-2xl border border-white/10">
            
            {/* Left part: Calendar Date Picker (7 cols on md) */}
            <div className="md:col-span-7 space-y-4">
              {/* Month Navigation */}
              <div className="flex items-center justify-between px-1">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  className="w-8 h-8 rounded-lg bg-[#141716] hover:bg-[#1E2220] text-white flex items-center justify-center border border-white/10 transition-colors cursor-pointer"
                  aria-label="Previous Month"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="text-xs sm:text-sm font-black text-white uppercase tracking-wider">
                  {monthNames[month]} {year}
                </div>

                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="w-8 h-8 rounded-lg bg-[#141716] hover:bg-[#1E2220] text-white flex items-center justify-center border border-white/10 transition-colors cursor-pointer"
                  aria-label="Next Month"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Day of Week Headers */}
              <div className="grid grid-cols-7 text-center text-[10px] font-black uppercase tracking-wider text-white/40">
                <span>Su</span>
                <span>Mo</span>
                <span>Tu</span>
                <span>We</span>
                <span>Th</span>
                <span>Fr</span>
                <span>Sa</span>
              </div>

              {/* Calendar Days Matrix */}
              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {calendarDays.map((item, idx) => {
                  const isSelected = isSameDay(item.date, selectedDate);
                  const isAvailable = item.isCurrentMonth && item.date.getDay() !== 0;

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setSelectedDate(item.date);
                        setSelectedTime(null);
                      }}
                      className={`h-8 sm:h-9 rounded-lg font-bold flex items-center justify-center transition-all cursor-pointer relative ${
                        isSelected
                          ? 'bg-[#C6FF00] text-[#0A0C0B] font-black shadow-[0_0_15px_rgba(198,255,0,0.5)] scale-105 z-10'
                          : item.isCurrentMonth
                          ? 'text-white hover:bg-white/10'
                          : 'text-white/20 hover:text-white/40'
                      }`}
                    >
                      <span>{item.dayNumber}</span>
                      {isAvailable && !isSelected && (
                        <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#C6FF00]/50" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right part: Time Slots for Selected Date (5 cols on md) */}
            <div className="md:col-span-5 md:border-l md:border-white/10 md:pl-5 flex flex-col justify-between pt-4 md:pt-0 border-t md:border-t-0 border-white/10">
              <div className="space-y-3">
                <div className="text-xs font-black text-white uppercase tracking-tight">
                  {formatSelectedDateHeading()}
                </div>

                {availableSlots.length === 0 ? (
                  <div className="py-8 text-center text-white/40 text-xs font-light space-y-1">
                    <p className="font-medium text-white/60">No times available on this date.</p>
                    <p className="text-[11px]">Please select another date on the calendar.</p>
                  </div>
                ) : (
                  <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 block mb-1">
                      Available Times
                    </span>
                    {availableSlots.map((time) => {
                      const isCurrentSelected = selectedTime === time;
                      return (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`w-full py-2 px-3 rounded-xl text-xs font-bold tracking-wide transition-all flex items-center justify-between border cursor-pointer ${
                            isCurrentSelected
                              ? 'bg-[#C6FF00] text-[#0A0C0B] border-[#C6FF00] font-black shadow-[0_0_12px_rgba(198,255,0,0.3)]'
                              : 'bg-[#141716] text-white/80 border-white/10 hover:border-[#C6FF00]/50 hover:text-[#C6FF00]'
                          }`}
                        >
                          <span>{time}</span>
                          <span className="text-[10px] opacity-75">30m</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Quick Attendee Form when a time is selected */}
          {selectedTime && (
            <form onSubmit={handleConfirmBooking} className="bg-[#0A0C0B] p-4 sm:p-5 rounded-2xl border border-[#C6FF00]/40 space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C6FF00]" />
                  <span className="text-xs font-black text-[#C6FF00] uppercase tracking-wider">
                    Lock In Your Slot: {selectedTime}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedTime(null)}
                  className="text-[10px] text-white/40 hover:text-white underline cursor-pointer"
                >
                  Change Time
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Your Full Name *"
                  value={attendee.name}
                  onChange={(e) => setAttendee({ ...attendee, name: e.target.value })}
                  className="bg-[#141716] px-3.5 py-2.5 rounded-xl border border-white/10 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#C6FF00]"
                />
                <input
                  type="email"
                  required
                  placeholder="Work Email Address *"
                  value={attendee.email}
                  onChange={(e) => setAttendee({ ...attendee, email: e.target.value })}
                  className="bg-[#141716] px-3.5 py-2.5 rounded-xl border border-white/10 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#C6FF00]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#C6FF00] hover:bg-[#b2e600] text-[#0A0C0B] py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(198,255,0,0.25)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Confirming...' : 'Confirm 30-Min Survey'}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </form>
          )}

          {/* Micro-note */}
          <div className="text-center">
            <p className="text-[11px] text-white/40 font-light">
              By booking, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
