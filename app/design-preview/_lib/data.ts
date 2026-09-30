// THROWAWAY fake seed data for the design-preview mockups only.
// Shapes loosely follow docs/04_DATA_MODEL.md so the mockup reflects real
// capabilities (stages, sources, campaigns, activities) — not real data.

export const stages = [
  "New",
  "Contact Attempted",
  "Follow Up",
  "Meeting",
  "Ongoing",
  "Closed",
  "Cancelled",
] as const;

// Team Pipeline matrix (docs/08) only ever shows these 5 non-terminal stages.
export const pipelineMatrixStages = stages.slice(0, 5);

export type Stage = (typeof stages)[number];

export const reps = [
  { id: "hekal", name: "Hekal" },
  { id: "habiba", name: "Habiba" },
  { id: "salma", name: "Salma" },
] as const;

export const sources = ["LinkedIn", "Google Ads", "Referral", "Website Form", "Outbound Call"] as const;

export const campaigns = ["Q3 Media Push", "Ramadan Promo", "Outbound Sprint", "Referral Program"] as const;

export type Activity = {
  type: "Call" | "Message" | "LinkedIn Outreach" | "WhatsApp" | "Email" | "Follow-Up" | "Meeting" | "Other";
  note: string;
  when: string;
  by: string;
};

export type Lead = {
  id: string;
  leadDate: string;
  prospectName: string;
  jobTitle: string;
  company: string;
  industry: string;
  mobile: string;
  email: string;
  linkedinUrl: string;
  responseStatus: "New" | "Interested" | "No Response" | "Not Interested";
  stage: Stage;
  outcome: "Won" | "Lost" | null;
  owner: (typeof reps)[number]["name"];
  source: (typeof sources)[number];
  campaign: (typeof campaigns)[number];
  nextFollowUp: string;
  followUpBucket: "overdue" | "dueToday" | "upcoming" | "none";
  finalMediaPlanAmount: number | null;
  finalQuotationAmount: number | null;
  activities: Activity[];
};

function latest(lead: Pick<Lead, "activities">) {
  const a = lead.activities[lead.activities.length - 1];
  return { action: a?.type ?? "—", feedback: a?.note ?? "—", when: a?.when ?? "—" };
}

const rawLeads: Omit<Lead, "id">[] = [
  {
    leadDate: "Sep 2", prospectName: "Ahmed Hassan", jobTitle: "Marketing Manager", company: "Acme Media",
    industry: "Media", mobile: "+20 100 123 4567", email: "ahmed@acmemedia.com", linkedinUrl: "linkedin.com/in/ahmedhassan",
    responseStatus: "Interested", stage: "Meeting", outcome: null, owner: "Hekal", source: "LinkedIn", campaign: "Q3 Media Push",
    nextFollowUp: "Today, 3:00 PM", followUpBucket: "dueToday", finalMediaPlanAmount: 48000, finalQuotationAmount: 52000,
    activities: [
      { type: "Call", note: "Introduced Q3 package", when: "Sep 3", by: "Hekal" },
      { type: "Meeting", note: "Stage changed: Follow Up → Meeting", when: "Sep 12", by: "Hekal" },
      { type: "Call", note: "Interested in Q2 package", when: "Yesterday", by: "Hekal" },
      { type: "Meeting", note: "Meeting scheduled for tomorrow, 3pm", when: "Today", by: "Hekal" },
    ],
  },
  {
    leadDate: "Sep 4", prospectName: "Sara Ali", jobTitle: "Procurement Lead", company: "Nour Group",
    industry: "FMCG", mobile: "+20 101 234 5678", email: "sara.ali@nourgroup.com", linkedinUrl: "linkedin.com/in/saraali",
    responseStatus: "No Response", stage: "Follow Up", outcome: null, owner: "Hekal", source: "Referral", campaign: "Referral Program",
    nextFollowUp: "Tomorrow, 11:00 AM", followUpBucket: "upcoming", finalMediaPlanAmount: null, finalQuotationAmount: 21000,
    activities: [
      { type: "Email", note: "Sent proposal, no reply yet", when: "4 days ago", by: "Hekal" },
      { type: "Follow-Up", note: "Left voicemail", when: "1 day ago", by: "Hekal" },
    ],
  },
  {
    leadDate: "Sep 20", prospectName: "Mohamed Tarek", jobTitle: "Owner", company: "Delta Foods",
    industry: "FMCG", mobile: "+20 102 345 6789", email: "m.tarek@deltafoods.com", linkedinUrl: "linkedin.com/in/mohamedtarek",
    responseStatus: "New", stage: "New", outcome: null, owner: "Hekal", source: "Website Form", campaign: "Q3 Media Push",
    nextFollowUp: "—", followUpBucket: "none", finalMediaPlanAmount: null, finalQuotationAmount: null,
    activities: [{ type: "Other", note: "Lead created from website form", when: "3 days ago", by: "System" }],
  },
  {
    leadDate: "Sep 18", prospectName: "Nourhan Adel", jobTitle: "Ops Director", company: "Cairo Motors",
    industry: "Automotive", mobile: "+20 103 456 7890", email: "nourhan@cairomotors.com", linkedinUrl: "linkedin.com/in/nourhanadel",
    responseStatus: "Interested", stage: "Contact Attempted", outcome: null, owner: "Hekal", source: "Outbound Call", campaign: "Outbound Sprint",
    nextFollowUp: "In 2 days", followUpBucket: "upcoming", finalMediaPlanAmount: null, finalQuotationAmount: null,
    activities: [{ type: "Call", note: "Left voicemail, will call back", when: "5h ago", by: "Hekal" }],
  },
  {
    leadDate: "Aug 29", prospectName: "Youssef Kamel", jobTitle: "CEO", company: "Blue Nile Corp",
    industry: "Logistics", mobile: "+20 104 567 8901", email: "youssef@bluenile.com", linkedinUrl: "linkedin.com/in/youssefkamel",
    responseStatus: "Interested", stage: "Closed", outcome: "Won", owner: "Hekal", source: "Referral", campaign: "Referral Program",
    nextFollowUp: "—", followUpBucket: "none", finalMediaPlanAmount: 60000, finalQuotationAmount: 60000,
    activities: [
      { type: "Meeting", note: "Final terms agreed", when: "1w ago", by: "Hekal" },
      { type: "Other", note: "Contract signed — deal closed", when: "6d ago", by: "Hekal" },
    ],
  },
  {
    leadDate: "Sep 10", prospectName: "Laila Mostafa", jobTitle: "Brand Manager", company: "Zamalek Retail",
    industry: "Retail", mobile: "+20 105 678 9012", email: "laila@zamalekretail.com", linkedinUrl: "linkedin.com/in/lailamostafa",
    responseStatus: "Not Interested", stage: "Cancelled", outcome: "Lost", owner: "Hekal", source: "Google Ads", campaign: "Q3 Media Push",
    nextFollowUp: "—", followUpBucket: "none", finalMediaPlanAmount: null, finalQuotationAmount: 15000,
    activities: [{ type: "Call", note: "Budget cut, not moving forward", when: "3d ago", by: "Hekal" }],
  },
  {
    leadDate: "Sep 22", prospectName: "Omar Fathy", jobTitle: "Founder", company: "Giza Textiles",
    industry: "Manufacturing", mobile: "+20 106 789 0123", email: "omar@gizatextiles.com", linkedinUrl: "linkedin.com/in/omarfathy",
    responseStatus: "Interested", stage: "Ongoing", outcome: null, owner: "Hekal", source: "LinkedIn", campaign: "Outbound Sprint",
    nextFollowUp: "2 days overdue", followUpBucket: "overdue", finalMediaPlanAmount: 32000, finalQuotationAmount: 35000,
    activities: [
      { type: "Meeting", note: "Discussed rollout timeline", when: "6d ago", by: "Hekal" },
      { type: "WhatsApp", note: "Sent updated quotation", when: "2d ago", by: "Hekal" },
    ],
  },
  {
    leadDate: "Sep 24", prospectName: "Heba Salah", jobTitle: "HR Director", company: "Pharaoh Logistics",
    industry: "Logistics", mobile: "+20 107 890 1234", email: "heba@pharaohlog.com", linkedinUrl: "linkedin.com/in/hebasalah",
    responseStatus: "New", stage: "New", outcome: null, owner: "Hekal", source: "Website Form", campaign: "Q3 Media Push",
    nextFollowUp: "—", followUpBucket: "none", finalMediaPlanAmount: null, finalQuotationAmount: null,
    activities: [{ type: "Other", note: "Lead created", when: "1d ago", by: "System" }],
  },

  {
    leadDate: "Sep 6", prospectName: "Karim Adly", jobTitle: "CFO", company: "Nile Fintech",
    industry: "Fintech", mobile: "+20 110 111 2222", email: "karim@nilefintech.com", linkedinUrl: "linkedin.com/in/karimadly",
    responseStatus: "Interested", stage: "Meeting", outcome: null, owner: "Habiba", source: "LinkedIn", campaign: "Outbound Sprint",
    nextFollowUp: "Today, 1:00 PM", followUpBucket: "dueToday", finalMediaPlanAmount: 75000, finalQuotationAmount: 80000,
    activities: [
      { type: "Call", note: "Discovery call, strong fit", when: "1w ago", by: "Habiba" },
      { type: "Meeting", note: "Demo scheduled", when: "2d ago", by: "Habiba" },
    ],
  },
  {
    leadDate: "Sep 8", prospectName: "Mona Reda", jobTitle: "Marketing Lead", company: "Alexandria Exports",
    industry: "Trade", mobile: "+20 111 222 3333", email: "mona@alexexports.com", linkedinUrl: "linkedin.com/in/monareda",
    responseStatus: "No Response", stage: "Follow Up", outcome: null, owner: "Habiba", source: "Google Ads", campaign: "Q3 Media Push",
    nextFollowUp: "3 days overdue", followUpBucket: "overdue", finalMediaPlanAmount: null, finalQuotationAmount: 18000,
    activities: [{ type: "Email", note: "Sent pricing, no response", when: "5d ago", by: "Habiba" }],
  },
  {
    leadDate: "Sep 25", prospectName: "Tarek Younes", jobTitle: "Clinic Manager", company: "Cairo Clinics",
    industry: "Healthcare", mobile: "+20 112 333 4444", email: "tarek@cairoclinics.com", linkedinUrl: "linkedin.com/in/tarekyounes",
    responseStatus: "New", stage: "New", outcome: null, owner: "Habiba", source: "Referral", campaign: "Referral Program",
    nextFollowUp: "—", followUpBucket: "none", finalMediaPlanAmount: null, finalQuotationAmount: null,
    activities: [{ type: "Other", note: "Lead created via referral", when: "2d ago", by: "System" }],
  },
  {
    leadDate: "Sep 15", prospectName: "Rana Fahmy", jobTitle: "Supply Chain Manager", company: "Delta Pharma",
    industry: "Healthcare", mobile: "+20 113 444 5555", email: "rana@deltapharma.com", linkedinUrl: "linkedin.com/in/ranafahmy",
    responseStatus: "Interested", stage: "Contact Attempted", outcome: null, owner: "Habiba", source: "Outbound Call", campaign: "Outbound Sprint",
    nextFollowUp: "In 4 days", followUpBucket: "upcoming", finalMediaPlanAmount: null, finalQuotationAmount: null,
    activities: [{ type: "Call", note: "Interested, wants a proposal", when: "8h ago", by: "Habiba" }],
  },
  {
    leadDate: "Aug 24", prospectName: "Amr Soliman", jobTitle: "Founder", company: "Smart Homes EG",
    industry: "Retail", mobile: "+20 114 555 6666", email: "amr@smarthomeseg.com", linkedinUrl: "linkedin.com/in/amrsoliman",
    responseStatus: "Interested", stage: "Closed", outcome: "Won", owner: "Habiba", source: "LinkedIn", campaign: "Outbound Sprint",
    nextFollowUp: "—", followUpBucket: "none", finalMediaPlanAmount: 40000, finalQuotationAmount: 40000,
    activities: [{ type: "Other", note: "Contract signed", when: "9d ago", by: "Habiba" }],
  },
  {
    leadDate: "Sep 1", prospectName: "Dina Hamdy", jobTitle: "Marketing Manager", company: "Cairo Bakery Co",
    industry: "FMCG", mobile: "+20 115 666 7777", email: "dina@cairobakery.com", linkedinUrl: "linkedin.com/in/dinahamdy",
    responseStatus: "Not Interested", stage: "Cancelled", outcome: "Lost", owner: "Habiba", source: "Website Form", campaign: "Q3 Media Push",
    nextFollowUp: "—", followUpBucket: "none", finalMediaPlanAmount: null, finalQuotationAmount: 9000,
    activities: [{ type: "Message", note: "Went with a competitor", when: "6d ago", by: "Habiba" }],
  },
  {
    leadDate: "Sep 26", prospectName: "Yara Nabil", jobTitle: "Operations Lead", company: "Nour Solar",
    industry: "Solar Energy", mobile: "+20 116 777 8888", email: "yara@noursolar.com", linkedinUrl: "linkedin.com/in/yaranabil",
    responseStatus: "New", stage: "New", outcome: null, owner: "Habiba", source: "Google Ads", campaign: "Q3 Media Push",
    nextFollowUp: "—", followUpBucket: "none", finalMediaPlanAmount: null, finalQuotationAmount: null,
    activities: [{ type: "Other", note: "Lead created", when: "12h ago", by: "System" }],
  },

  {
    leadDate: "Sep 5", prospectName: "Khaled Ezz", jobTitle: "Managing Partner", company: "Maadi Consulting",
    industry: "Consulting", mobile: "+20 120 888 9999", email: "khaled@maadiconsulting.com", linkedinUrl: "linkedin.com/in/khaledezz",
    responseStatus: "Interested", stage: "Meeting", outcome: null, owner: "Salma", source: "Referral", campaign: "Referral Program",
    nextFollowUp: "Today, 5:00 PM", followUpBucket: "dueToday", finalMediaPlanAmount: 26000, finalQuotationAmount: 30000,
    activities: [
      { type: "LinkedIn Outreach", note: "Connected, replied same day", when: "10d ago", by: "Salma" },
      { type: "Meeting", note: "Intro call went well", when: "2d ago", by: "Salma" },
    ],
  },
  {
    leadDate: "Sep 11", prospectName: "Nadia Fouad", jobTitle: "Parts Manager", company: "October Autoparts",
    industry: "Automotive", mobile: "+20 121 999 0000", email: "nadia@octautoparts.com", linkedinUrl: "linkedin.com/in/nadiafouad",
    responseStatus: "No Response", stage: "Follow Up", outcome: null, owner: "Salma", source: "Outbound Call", campaign: "Outbound Sprint",
    nextFollowUp: "1 day overdue", followUpBucket: "overdue", finalMediaPlanAmount: null, finalQuotationAmount: 12000,
    activities: [{ type: "Call", note: "No answer, tried twice", when: "3d ago", by: "Salma" }],
  },
  {
    leadDate: "Sep 27", prospectName: "Ibrahim Sayed", jobTitle: "Editor", company: "Heliopolis Media",
    industry: "Media", mobile: "+20 122 000 1111", email: "ibrahim@heliopolismedia.com", linkedinUrl: "linkedin.com/in/ibrahimsayed",
    responseStatus: "New", stage: "New", outcome: null, owner: "Salma", source: "Website Form", campaign: "Q3 Media Push",
    nextFollowUp: "—", followUpBucket: "none", finalMediaPlanAmount: null, finalQuotationAmount: null,
    activities: [{ type: "Other", note: "Lead created", when: "6h ago", by: "System" }],
  },
  {
    leadDate: "Sep 13", prospectName: "Salma Gaber", jobTitle: "Sales Director", company: "Nasr City Realty",
    industry: "Real Estate", mobile: "+20 123 111 2222", email: "salma.g@nasrcityrealty.com", linkedinUrl: "linkedin.com/in/salmagaber",
    responseStatus: "Interested", stage: "Ongoing", outcome: null, owner: "Salma", source: "LinkedIn", campaign: "Outbound Sprint",
    nextFollowUp: "In 3 days", followUpBucket: "upcoming", finalMediaPlanAmount: 55000, finalQuotationAmount: 58000,
    activities: [{ type: "WhatsApp", note: "Reviewing quotation internally", when: "1d ago", by: "Salma" }],
  },
  {
    leadDate: "Aug 20", prospectName: "Fady Mikhail", jobTitle: "Owner", company: "Sheikh Zayed Retail",
    industry: "Retail", mobile: "+20 124 222 3333", email: "fady@szretail.com", linkedinUrl: "linkedin.com/in/fadymikhail",
    responseStatus: "Interested", stage: "Closed", outcome: "Won", owner: "Salma", source: "Referral", campaign: "Referral Program",
    nextFollowUp: "—", followUpBucket: "none", finalMediaPlanAmount: 22000, finalQuotationAmount: 22000,
    activities: [{ type: "Other", note: "Contract signed", when: "12d ago", by: "Salma" }],
  },
  {
    leadDate: "Sep 9", prospectName: "Mai Adham", jobTitle: "Marketing Manager", company: "Downtown Print",
    industry: "Manufacturing", mobile: "+20 125 333 4444", email: "mai@downtownprint.com", linkedinUrl: "linkedin.com/in/maiadham",
    responseStatus: "Not Interested", stage: "Cancelled", outcome: "Lost", owner: "Salma", source: "Google Ads", campaign: "Q3 Media Push",
    nextFollowUp: "—", followUpBucket: "none", finalMediaPlanAmount: null, finalQuotationAmount: 7000,
    activities: [{ type: "Email", note: "Not the right time", when: "4d ago", by: "Salma" }],
  },
  {
    leadDate: "Sep 28", prospectName: "Sherif Kamal", jobTitle: "GM", company: "Mansoura Textiles",
    industry: "Manufacturing", mobile: "+20 126 444 5555", email: "sherif@mansouratextiles.com", linkedinUrl: "linkedin.com/in/sherifkamal",
    responseStatus: "New", stage: "New", outcome: null, owner: "Salma", source: "Website Form", campaign: "Q3 Media Push",
    nextFollowUp: "—", followUpBucket: "none", finalMediaPlanAmount: null, finalQuotationAmount: null,
    activities: [{ type: "Other", note: "Lead created", when: "3h ago", by: "System" }],
  },
];

export const leads: Lead[] = rawLeads.map((l, i) => ({ id: `lead-${i + 1}`, ...l }));

export function latestActivity(lead: Lead) {
  return latest(lead);
}

export function leadsFor(repName: string) {
  return leads.filter((l) => l.owner === repName);
}

export const followUpLabel: Record<Lead["followUpBucket"], string> = {
  overdue: "Overdue",
  dueToday: "Due Today",
  upcoming: "Upcoming",
  none: "—",
};
