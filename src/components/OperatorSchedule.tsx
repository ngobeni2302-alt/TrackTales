import React, { useState } from 'react';
import { Train, ArrowRight, CheckCircle2 } from 'lucide-react';
import type { Operator, Stop } from '../services/companionSync';

interface OperatorScheduleProps {
  operators: Operator[];
  stops: Stop[];
}

export const OperatorSchedule: React.FC<OperatorScheduleProps> = ({ operators, stops }) => {
  const [selectedOperatorCode, setSelectedOperatorCode] = useState<string>('BLUE_TRAIN');

  const activeOperator = operators.find(op => op.code === selectedOperatorCode) || operators[0];

  const getStopNameByCode = (code: string) => {
    const s = stops.find(st => st.code === code);
    return s ? s.name : code;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs uppercase tracking-wider mb-1">
          <Train className="w-4 h-4 text-amber-400" />
          Phase Two Companion Mode Integration
        </div>
        <h3 className="text-2xl font-serif font-bold text-slate-100">
          Rail Operator Schedules & Pacing Metadata
        </h3>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
          Companion Mode calculates stop ETAs based on operator-specific timetables (Blue Train 31h, Rovos Rail 48h leisurely excursion, Shosholoza Meyl 26h express).
        </p>
      </div>

      {/* Operator Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {operators.map((op) => {
          const isSelected = op.code === selectedOperatorCode;
          return (
            <button
              key={op.code}
              onClick={() => setSelectedOperatorCode(op.code)}
              className={`p-4 rounded-xl text-left border transition-all duration-300 flex flex-col justify-between space-y-3 ${
                isSelected
                  ? 'bg-slate-950 border-amber-500 shadow-xl ring-1 ring-amber-500/50'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: op.brand_color || '#d97706' }}
                />
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-slate-800 text-amber-300">
                  R {op.base_price_zar.toLocaleString()} ZAR
                </span>
              </div>

              <div>
                <h4 className={`text-base font-serif font-bold ${isSelected ? 'text-amber-200' : 'text-slate-200'}`}>
                  {op.name}
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-1 italic">
                  {op.tagline}
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-2 border-t border-slate-800">
                <span>⏱ {op.schedule_info?.duration_hours || 30}h total</span>
                <span className="text-amber-400 font-semibold flex items-center gap-1">
                  View Timetable <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Operator Details & Timetable */}
      {activeOperator && (
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: activeOperator.brand_color }}
                />
                <h4 className="text-xl font-serif font-bold text-slate-100">
                  {activeOperator.name} Timetable & Services
                </h4>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {activeOperator.description}
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono">
              <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-amber-300">
                📅 Departures: <strong>{activeOperator.schedule_info.departure_day}</strong>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-amber-300">
                ⏱ Total Duration: <strong>{activeOperator.schedule_info.duration_hours} Hours</strong>
              </div>
            </div>
          </div>

          {/* Timetable Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-800 text-amber-400 text-[11px] uppercase tracking-wider">
                  <th className="pb-3 font-semibold">Station Stop</th>
                  <th className="pb-3 font-semibold">Arrival Time</th>
                  <th className="pb-3 font-semibold">Departure Time</th>
                  <th className="pb-3 font-semibold">Off-Train Excursion / Companion Sync</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {activeOperator.schedule_info.stops_schedule.map((st, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/50 transition-colors">
                    <td className="py-3 font-sans font-semibold text-slate-200">
                      {getStopNameByCode(st.stop_code)} ({st.stop_code})
                    </td>
                    <td className="py-3 text-amber-300 font-bold">{st.arr}</td>
                    <td className="py-3 text-slate-300">{st.dep}</td>
                    <td className="py-3">
                      {st.excursion ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-sans font-medium">
                          🏆 {st.excursion}
                        </span>
                      ) : (
                        <span className="text-slate-500 font-sans">Pass-through & Companion Geofence Sync</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Amenities Grid */}
          <div className="pt-4 border-t border-slate-800">
            <h5 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-3">
              Included Onboard Amenities & Services:
            </h5>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {activeOperator.amenities.map((amenity, idx) => (
                <div
                  key={idx}
                  className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-sans text-slate-300 flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
