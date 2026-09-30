"use client";

import { reps, leads, pipelineMatrixStages } from "../../_lib/data";
import { PageHeader, ManagerFilterBar, SectionCard } from "../../_lib/ui";

export default function ManagerPipelinePage() {
  const rows = reps.map((rep) => {
    const counts = pipelineMatrixStages.map(
      (stage) => leads.filter((l) => l.owner === rep.name && l.stage === stage).length
    );
    return { rep: rep.name, counts };
  });

  const totals = pipelineMatrixStages.map((stage) => leads.filter((l) => l.stage === stage).length);

  return (
    <>
      <PageHeader title="Pipeline" subtitle="Rep × stage distribution across the team" />
      <ManagerFilterBar />

      <SectionCard title="Team Pipeline">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-xs font-medium uppercase tracking-wide text-[#A1A1AA]">
              <th className="px-4 py-2.5">Rep</th>
              {pipelineMatrixStages.map((stage) => (
                <th key={stage} className="px-4 py-2.5">{stage}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.rep} className="border-t border-[#F0F0F2] hover:bg-[#FAFAFF]">
                <td className="px-4 py-3 font-medium">{row.rep}</td>
                {row.counts.map((c, i) => (
                  <td key={i} className="px-4 py-3 text-[#52525B]">{c}</td>
                ))}
              </tr>
            ))}
            <tr className="border-t border-[#E4E4E7] bg-[#F7F7F8] font-medium">
              <td className="px-4 py-3">Total</td>
              {totals.map((t, i) => (
                <td key={i} className="px-4 py-3">{t}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </SectionCard>
    </>
  );
}
