export const COMPLAINT_CATEGORIES = [
    "রাস্তা খারাপ / ভাঙা / কাদামাটি জমে থাকা",
    "স্ট্রিট লাইট নষ্ট",
    "ড্রেন বন্ধ / ড্রেন পরিষ্কার না করা",
    "ময়লা-আবর্জনা নিয়মিত পরিষ্কার না হওয়া",
    "পানির সরবরাহ সমস্যা",
    "অতিরিক্ত বা ভুলভাবে হোল্ডিং ট্যাক্স নির্ধারণ",
    "ট্রেড লাইসেন্স ইস্যু বা নবায়নে জটিলতা",
    "জন্ম/মৃত্যু নিবন্ধনে ভুল বা বিলম্ব",
    "অবৈধ নির্মাণ বা অনুমোদন ছাড়া বিল্ডিং নির্মাণের অভিযোগ",
    "বাজারে অস্বাস্থ্যকর পরিবেশ / দখলদারিত্ব",
    "পৌরসভার কর্মীদের অনিয়ম বা দুর্ব্যবহার",
];

export const STATUS_COLORS: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    under_review: "bg-blue-100 text-blue-800 border-blue-200",
    approved: "bg-purple-100 text-purple-800 border-purple-200",
    in_progress: "bg-orange-100 text-orange-800 border-orange-200",
    solved: "bg-green-100 text-green-800 border-green-200",
};

export const TRANSLATED_STATUS: Record<string, string> = {
    pending: "অপেক্ষমান",
    under_review: "পর্যালোচনাধীন",
    approved: "অনুমোদিত",
    in_progress: "কাজ চলছে",
    solved: "সমাধান হয়েছে",
};
