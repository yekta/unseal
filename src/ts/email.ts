export type TAccountIconColor =
  | "red"
  | "lime"
  | "blue"
  | "yellow"
  | "green"
  | "purple"
  | "on-bg";

export type TAccountIconType =
  | "school"
  | "work"
  | "terminal"
  | "building"
  | "trophy"
  | "rocket"
  | "inbox";

export interface TAccount {
  id: string;
  email: string;
  iconColor: TAccountIconColor;
  iconType: TAccountIconType;
}

export interface TEmail {
  id: string;
  sender: string;
  title: string;
  body: string;
  isRead: boolean;
  isFavorited: boolean;
  date: string;
  account: TAccount;
}

export const accounts: TAccount[] = [
  {
    id: "1",
    email: "negoryekta@gmail.com",
    iconColor: "green",
    iconType: "trophy",
  },
  {
    id: "2",
    email: "ngyekta@gmail.com",
    iconColor: "blue",
    iconType: "rocket",
  },
  {
    id: "3",
    email: "hello@stablecog.com",
    iconColor: "purple",
    iconType: "work",
  },
  {
    id: "4",
    email: "muhammedyektagungor@std.sehir.edu.tr",
    iconColor: "red",
    iconType: "school",
  },
];

export const emails: TEmail[] = [
  {
    id: "1",
    sender: "GitHub",
    title:
      "[GitHub] A third-party OAuth application has been added to your account",
    body: "Hey​ ​yekta! A​ ​third-party​ ​OAuth​ ​application​ ​(Test App)​ ​with​ ​read:user​ ​and​ ​user:email​ ​scopes​ ​was​ ​recently​ ​authorized​ ​to​ ​access​ ​your​ ​account.",
    date: "2023-09-13T06:00:00.000Z",
    account: accounts[0],
    isRead: false,
    isFavorited: false,
  },
  {
    id: "2",
    sender: "Workplace",
    title: "Your meeting with the marketing team is scheduled for tomorrow.",
    body: "Hi there! Just a quick reminder about your meeting tomorrow at 3pm with the marketing team.",
    date: "2023-09-13T05:00:00.000Z",
    account: accounts[1],
    isRead: true,
    isFavorited: true,
  },
  {
    id: "3",
    sender: "DevOps",
    title: "Build #2345 failed!",
    body: "Hello, unfortunately, the recent build #2345 has failed. Please check the logs for more details.",
    date: "2023-09-13T04:00:00.000Z",
    account: accounts[0],
    isRead: false,
    isFavorited: true,
  },
  {
    id: "4",
    sender: "Real Estate",
    title: "New property listing in your area!",
    body: "Good news! A new property that matches your preferences has been listed in your area. Check it out now!",
    date: "2023-09-13T03:00:00.000Z",
    account: accounts[2],
    isRead: true,
    isFavorited: true,
  },
  {
    id: "5",
    sender: "University",
    title: "Enrollment confirmation for next semester",
    body: "We're pleased to inform you that you've been enrolled for the next semester. Check your course list online.",
    date: "2023-09-12T06:00:00.000Z",
    account: accounts[2],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "6",
    sender: "HR",
    title: "Updated benefits package",
    body: "We've made some updates to the benefits package. Please review the new documentation attached.",
    date: "2023-09-12T05:00:00.000Z",
    account: accounts[1],
    isRead: false,
    isFavorited: true,
  },
  {
    id: "7",
    sender: "Tech Team",
    title: "Server maintenance downtime",
    body: "Scheduled server maintenance will occur tonight from 2-3am. Expect some downtime.",
    date: "2023-09-12T04:00:00.000Z",
    account: accounts[3],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "8",
    sender: "Property Manager",
    title: "Scheduled power outage",
    body: "A scheduled power outage will take place tomorrow from 9am-11am for routine maintenance.",
    date: "2023-09-12T03:00:00.000Z",
    account: accounts[2],
    isRead: false,
    isFavorited: true,
  },
  {
    id: "9",
    sender: "University",
    title: "Enrollment confirmation for next semester",
    body: "We're pleased to inform you that you've been enrolled for the next semester. Check your course list online.",
    date: "2023-09-11T05:00:00.000Z",
    account: accounts[3],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "10",
    sender: "HR Department",
    title: "Updated benefits package",
    body: "We've made some updates to the benefits package. Please review the new documentation attached.",
    date: "2023-09-11T04:00:00.000Z",
    account: accounts[2],
    isRead: false,
    isFavorited: true,
  },
  {
    id: "11",
    sender: "Tech Team",
    title: "Server maintenance downtime",
    body: "Scheduled server maintenance will occur tonight from 2-3am. Expect some downtime.",
    date: "2023-09-11T03:00:00.000Z",
    account: accounts[1],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "12",
    sender: "Property Manager",
    title: "Scheduled power outage",
    body: "A scheduled power outage will take place tomorrow from 9am-11am for routine maintenance.",
    date: "2023-09-10T11:00:00.000Z",
    account: accounts[2],
    isRead: false,
    isFavorited: false,
  },
  {
    id: "13",
    sender: "Educational Forum",
    title: "Upcoming seminar on modern teaching methods",
    body: "Join our seminar next week to learn about the most effective teaching methods.",
    date: "2023-09-10T11:00:00.000Z",
    account: accounts[3],
    isRead: false,
    isFavorited: false,
  },
  {
    id: "14",
    sender: "Team Leads",
    title: "Weekly sync-up rescheduled",
    body: "Our weekly sync-up has been moved to Thursday. Please update your calendars.",
    date: "2023-09-10T11:00:00.000Z",
    account: accounts[2],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "15",
    sender: "Web Admin",
    title: "Website update successful",
    body: "The latest updates to our website have been successfully deployed without issues.",
    date: "2023-09-10T11:00:00.000Z",
    account: accounts[1],
    isRead: false,
    isFavorited: false,
  },
  {
    id: "16",
    sender: "City Council",
    title: "New zoning laws",
    body: "New zoning laws have been passed in your area. Check the attached document for details.",
    date: "2023-09-10T11:00:00.000Z",
    account: accounts[2],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "17",
    sender: "Online Course",
    title: "Certification exam next week",
    body: "A reminder that your certification exam is scheduled for next week.",
    date: "2023-09-10T11:00:00.000Z",
    account: accounts[3],
    isRead: false,
    isFavorited: false,
  },
  {
    id: "18",
    sender: "HR",
    title: "Office health guidelines",
    body: "Please review the updated office health and safety guidelines attached.",
    date: "2023-09-09T11:00:00.000Z",
    account: accounts[2],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "19",
    sender: "SysAdmin",
    title: "New software updates",
    body: "Please ensure your systems are updated with the latest software patches.",
    date: "2023-09-09T11:00:00.000Z",
    account: accounts[1],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "20",
    sender: "Real Estate Agency",
    title: "Viewing appointment confirmation",
    body: "Your viewing appointment for the apartment on Elm Street has been confirmed for Saturday.",
    date: "2023-09-09T11:00:00.000Z",
    account: accounts[2],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "21",
    sender: "Alumni Association",
    title: "Annual alumni meet",
    body: "You're invited to the annual alumni meet next month. RSVP by next week.",
    date: "2023-09-09T11:00:00.000Z",
    account: accounts[3],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "22",
    sender: "Company Retreat",
    title: "Details for the upcoming company retreat",
    body: "Find attached the itinerary and details for the upcoming company retreat.",
    date: "2023-09-09T11:00:00.000Z",
    account: accounts[2],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "23",
    sender: "Hosting Provider",
    title: "Scheduled server upgrades",
    body: "We will be performing server upgrades on Sunday from 1am-4am.",
    date: "2023-09-09T11:00:00.000Z",
    account: accounts[1],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "24",
    sender: "Construction Update",
    title: "Updated timeline for roadwork",
    body: "The roadwork on Maple Ave will now be completed by the end of next month.",
    date: "2023-09-09T11:00:00.000Z",
    account: accounts[2],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "25",
    sender: "HR Department",
    title: "Updated benefits package",
    body: "We've made some updates to the benefits package. Please review the new documentation attached.",
    date: "2023-09-09T11:00:00.000Z",
    account: accounts[2],
    isRead: false,
    isFavorited: false,
  },
  {
    id: "26",
    sender: "Tech Team",
    title: "Server maintenance downtime",
    body: "Scheduled server maintenance will occur tonight from 2-3am. Expect some downtime.",
    date: "2023-09-09T11:00:00.000Z",
    account: accounts[1],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "27",
    sender: "Property Manager",
    title: "Scheduled power outage",
    body: "A scheduled power outage will take place tomorrow from 9am-11am for routine maintenance.",
    date: "2023-09-09T11:00:00.000Z",
    account: accounts[2],
    isRead: false,
    isFavorited: false,
  },
  {
    id: "28",
    sender: "Educational Forum",
    title: "Upcoming seminar on modern teaching methods",
    body: "Join our seminar next week to learn about the most effective teaching methods.",
    date: "2023-09-09T11:00:00.000Z",
    account: accounts[3],
    isRead: false,
    isFavorited: false,
  },
  {
    id: "29",
    sender: "Team Leads",
    title: "Weekly sync-up rescheduled",
    body: "Our weekly sync-up has been moved to Thursday. Please update your calendars.",
    date: "2023-09-09T11:00:00.000Z",
    account: accounts[2],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "30",
    sender: "Web Admin",
    title: "Website update successful",
    body: "The latest updates to our website have been successfully deployed without issues.",
    date: "2023-09-09T11:00:00.000Z",
    account: accounts[1],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "31",
    sender: "City Council",
    title: "New zoning laws",
    body: "New zoning laws have been passed in your area. Check the attached document for details.",
    date: "2023-09-09T11:00:00.000Z",
    account: accounts[2],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "32",
    sender: "Online Course",
    title: "Certification exam next week",
    body: "A reminder that your certification exam is scheduled for next week.",
    date: "2023-09-09T11:00:00.000Z",
    account: accounts[3],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "33",
    sender: "HR",
    title: "Office health guidelines",
    body: "Please review the updated office health and safety guidelines attached.",
    date: "2023-09-09T11:00:00.000Z",
    account: accounts[2],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "34",
    sender: "SysAdmin",
    title: "New software updates",
    body: "Please ensure your systems are updated with the latest software patches.",
    date: "2023-09-09T11:00:00.000Z",
    account: accounts[1],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "35",
    sender: "Real Estate Agency",
    title: "Viewing appointment confirmation",
    body: "Your viewing appointment for the apartment on Elm Street has been confirmed for Saturday.",
    date: "2023-09-09T11:00:00.000Z",
    account: accounts[2],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "36",
    sender: "Alumni Association",
    title: "Annual alumni meet",
    body: "You're invited to the annual alumni meet next month. RSVP by next week.",
    date: "2023-09-09T11:00:00.000Z",
    account: accounts[3],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "37",
    sender: "Company Retreat",
    title: "Details for the upcoming company retreat",
    body: "Find attached the itinerary and details for the upcoming company retreat.",
    date: "2023-09-09T11:00:00.000Z",
    account: accounts[2],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "38",
    sender: "Hosting Provider",
    title: "Scheduled server upgrades",
    body: "We will be performing server upgrades on Sunday from 1am-4am.",
    date: "2023-09-09T11:00:00.000Z",
    account: accounts[1],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "39",
    sender: "Construction Update",
    title: "Updated timeline for roadwork",
    body: "The roadwork on Maple Ave will now be completed by the end of next month.",
    date: "2023-09-09T11:00:00.000Z",
    account: accounts[2],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "40",
    sender: "Construction Update",
    title: "Updated timeline for roadwork",
    body: "The roadwork on Maple Ave will now be completed by the end of next month.",
    date: "2023-09-09T11:00:00.000Z",
    account: accounts[2],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "41",
    sender: "Construction Update",
    title: "Updated timeline for roadwork",
    body: "The roadwork on Maple Ave will now be completed by the end of next month.",
    date: "2023-09-09T11:00:00.000Z",
    account: accounts[2],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "42",
    sender: "Construction Update",
    title: "Updated timeline for roadwork",
    body: "The roadwork on Maple Ave will now be completed by the end of next month.",
    date: "2023-09-09T11:00:00.000Z",
    account: accounts[0],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "43",
    sender: "Construction Update",
    title: "Updated timeline for roadwork",
    body: "The roadwork on Maple Ave will now be completed by the end of next month.",
    date: "2023-09-09T11:00:00.000Z",
    account: accounts[2],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "44",
    sender: "Construction Update",
    title: "Updated timeline for roadwork",
    body: "The roadwork on Maple Ave will now be completed by the end of next month.",
    date: "2023-09-09T11:00:00.000Z",
    account: accounts[2],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "45",
    sender: "Construction Update",
    title: "Updated timeline for roadwork",
    body: "The roadwork on Maple Ave will now be completed by the end of next month.",
    date: "2023-09-09T11:00:00.000Z",
    account: accounts[2],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "46",
    sender: "Construction Update",
    title: "Updated timeline for roadwork",
    body: "The roadwork on Maple Ave will now be completed by the end of next month.",
    date: "2023-09-09T11:00:00.000Z",
    account: accounts[2],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "47",
    sender: "Construction Update",
    title: "Updated timeline for roadwork",
    body: "The roadwork on Maple Ave will now be completed by the end of next month.",
    date: "2023-09-09T11:00:00.000Z",
    account: accounts[2],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "48",
    sender: "Construction Update",
    title: "Updated timeline for roadwork",
    body: "The roadwork on Maple Ave will now be completed by the end of next month.",
    date: "2023-09-09T11:00:00.000Z",
    account: accounts[2],
    isRead: false,
    isFavorited: false,
  },
  {
    id: "49",
    sender: "Construction Update",
    title: "Updated timeline for roadwork",
    body: "The roadwork on Maple Ave will now be completed by the end of next month.",
    date: "2023-09-09T11:00:00.000Z",
    account: accounts[2],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "50",
    sender: "Construction Update",
    title: "Updated timeline for roadwork",
    body: "The roadwork on Maple Ave will now be completed by the end of next month.",
    date: "2023-09-09T11:00:00.000Z",
    account: accounts[2],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "51",
    sender: "SysAdmin",
    title: "New software updates",
    body: "Please ensure your systems are updated with the latest software patches.",
    date: "2023-09-09T11:00:00.000Z",
    account: accounts[1],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "52",
    sender: "SysAdmin",
    title: "New software updates",
    body: "Please ensure your systems are updated with the latest software patches.",
    date: "2023-09-09T11:00:00.000Z",
    account: accounts[1],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "53",
    sender: "SysAdmin",
    title: "New software updates",
    body: "Please ensure your systems are updated with the latest software patches.",
    date: "2023-09-09T11:00:00.000Z",
    account: accounts[1],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "54",
    sender: "SysAdmin",
    title: "New software updates",
    body: "Please ensure your systems are updated with the latest software patches.",
    date: "2023-09-09T11:00:00.000Z",
    account: accounts[1],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "55",
    sender: "SysAdmin",
    title: "New software updates",
    body: "Please ensure your systems are updated with the latest software patches.",
    date: "2023-09-09T11:00:00.000Z",
    account: accounts[1],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "56",
    sender: "SysAdmin",
    title: "New software updates",
    body: "Please ensure your systems are updated with the latest software patches.",
    date: "2023-09-09T11:00:00.000Z",
    account: accounts[1],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "57",
    sender: "SysAdmin",
    title: "New software updates",
    body: "Please ensure your systems are updated with the latest software patches.",
    date: "2023-09-09T11:00:00.000Z",
    account: accounts[1],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "58",
    sender: "SysAdmin",
    title: "New software updates",
    body: "Please ensure your systems are updated with the latest software patches.",
    date: "2023-09-09T11:00:00.000Z",
    account: accounts[1],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "59",
    sender: "SysAdmin",
    title: "New software updates",
    body: "Please ensure your systems are updated with the latest software patches.",
    date: "2023-09-09T11:00:00.000Z",
    account: accounts[1],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "60",
    sender: "SysAdmin",
    title: "New software updates",
    body: "Please ensure your systems are updated with the latest software patches.",
    date: "2023-09-09T11:00:00.000Z",
    account: accounts[0],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "61",
    sender: "HR",
    title: "Office health guidelines",
    body: "Please review the updated office health and safety guidelines attached.",
    date: "2023-09-09T11:00:00.000Z",
    account: accounts[2],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "62",
    sender: "HR",
    title: "Office health guidelines",
    body: "Please review the updated office health and safety guidelines attached.",
    date: "2023-09-09T11:00:00.000Z",
    account: accounts[2],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "63",
    sender: "HR",
    title: "Office health guidelines",
    body: "Please review the updated office health and safety guidelines attached.",
    date: "2023-09-09T11:00:00.000Z",
    account: accounts[2],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "64",
    sender: "HR",
    title: "Office health guidelines",
    body: "Please review the updated office health and safety guidelines attached.",
    date: "2023-09-09T11:00:00.000Z",
    account: accounts[2],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "65",
    sender: "HR",
    title: "Office health guidelines",
    body: "Please review the updated office health and safety guidelines attached.",
    date: "2023-09-09T11:00:00.000Z",
    account: accounts[2],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "66",
    sender: "HR",
    title: "Office health guidelines",
    body: "Please review the updated office health and safety guidelines attached.",
    date: "2023-09-09T11:00:00.000Z",
    account: accounts[2],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "67",
    sender: "HR",
    title: "Office health guidelines",
    body: "Please review the updated office health and safety guidelines attached.",
    date: "2023-09-09T11:00:00.000Z",
    account: accounts[2],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "68",
    sender: "HR",
    title: "Office health guidelines",
    body: "Please review the updated office health and safety guidelines attached.",
    date: "2023-09-09T11:00:00.000Z",
    account: accounts[2],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "69",
    sender: "HR",
    title: "Office health guidelines",
    body: "Please review the updated office health and safety guidelines attached.",
    date: "2023-09-09T11:00:00.000Z",
    account: accounts[2],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "70",
    sender: "HR",
    title: "Office health guidelines",
    body: "Please review the updated office health and safety guidelines attached.",
    date: "2023-09-09T11:00:00.000Z",
    account: accounts[2],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "71",
    sender: "Educational Forum",
    title: "Upcoming seminar on modern teaching methods",
    body: "Join our seminar next week to learn about the most effective teaching methods.",
    date: "2023-09-08T11:00:00.000Z",
    account: accounts[3],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "72",
    sender: "Educational Forum",
    title: "Upcoming seminar on modern teaching methods",
    body: "Join our seminar next week to learn about the most effective teaching methods.",
    date: "2023-09-08T11:00:00.000Z",
    account: accounts[3],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "73",
    sender: "Educational Forum",
    title: "Upcoming seminar on modern teaching methods",
    body: "Join our seminar next week to learn about the most effective teaching methods.",
    date: "2023-09-08T11:00:00.000Z",
    account: accounts[3],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "74",
    sender: "Educational Forum",
    title: "Upcoming seminar on modern teaching methods",
    body: "Join our seminar next week to learn about the most effective teaching methods.",
    date: "2023-09-08T11:00:00.000Z",
    account: accounts[3],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "75",
    sender: "Educational Forum",
    title: "Upcoming seminar on modern teaching methods",
    body: "Join our seminar next week to learn about the most effective teaching methods.",
    date: "2023-09-08T11:00:00.000Z",
    account: accounts[1],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "76",
    sender: "Educational Forum",
    title: "Upcoming seminar on modern teaching methods",
    body: "Join our seminar next week to learn about the most effective teaching methods.",
    date: "2023-09-08T11:00:00.000Z",
    account: accounts[1],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "77",
    sender: "Educational Forum",
    title: "Upcoming seminar on modern teaching methods",
    body: "Join our seminar next week to learn about the most effective teaching methods.",
    date: "2023-08-10T11:00:00.000Z",
    account: accounts[3],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "78",
    sender: "Educational Forum",
    title: "Upcoming seminar on modern teaching methods",
    body: "Join our seminar next week to learn about the most effective teaching methods.",
    date: "2023-08-10T11:00:00.000Z",
    account: accounts[3],
    isRead: true,
    isFavorited: false,
  },
  {
    id: "79",
    sender: "Educational Forum",
    title: "Upcoming seminar on modern teaching methods",
    body: "Join our seminar next week to learn about the most effective teaching methods.",
    date: "2023-08-10T11:00:00.000Z",
    account: accounts[2],
    isRead: true,
    isFavorited: true,
  },
  {
    id: "80",
    sender: "Educational Forum",
    title: "Upcoming seminar on modern teaching methods",
    body: "Join our seminar next week to learn about the most effective teaching methods.",
    date: "2023-08-10T11:00:00.000Z",
    account: accounts[0],
    isRead: true,
    isFavorited: true,
  },
];

export const unreadEmails = emails.filter((email) => !email.isRead);
export const favoritedEmails = emails.filter((email) => email.isFavorited);
