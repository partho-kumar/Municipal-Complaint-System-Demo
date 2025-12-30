const Footer = () => {
    return (
        <footer className="bg-slate-600 text-gray-300 py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4">
                            যোগাযোগ করুন
                        </h3>
                        <p>পৌরসভা কার্যালয়</p>
                        <p>সদর ----,---</p>
                        <p>ফোন: 0118454454545</p>
                        <p>ইমেইল: info@nahidull.com</p>
                    </div>
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4">
                            দ্রুত লিংক
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition"
                                >
                                    হোম
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition"
                                >
                                    সেবাসমূহ
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition"
                                >
                                    নোটিশ বোর্ড
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition"
                                >
                                    জরুরী যোগাযোগ
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4">
                            আমাদের লক্ষ্য
                        </h3>
                        <p className="text-sm">
                            একটি স্মার্ট, পরিচ্ছন্ন এবং নাগরিকবান্ধব পৌরসভা গড়ে
                            তোলাই আমাদের প্রধান লক্ষ্য। আপনার সহযোগিতা আমাদের
                            একান্ত কাম্য।
                        </p>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
                    <p>
                        &copy; ২০২5 পৌরসভা সার্ভিস পোর্টাল। সর্বস্বত্ব সংরক্ষিত।
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

