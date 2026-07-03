import React from "react";

import heroImage from "../../../assets/hero.png";

const contactLinks = [
    { label: "Call Center", value: "800 100 975 20 34\n+1 (123) 800-234-5678" },
    { label: "Our Location", value: "USA, New York - 1060\n+St. First, avenue 1" },
    { label: "Email", value: "neuro@mail.co" },
    { label: "Social network", value: "f   x   in   yt" },
];

const ContactusSection = () => {
    return (
        <div className="w-full overflow-hidden bg-[#f7f7f7] text-[#111111]">
            <section className="mx-auto w-full max-w-[1400px] px-4 pb-8 pt-4 sm:px-6 lg:px-8 lg:pb-10">
                <div
                    className="relative overflow-hidden rounded-[28px] bg-[#10162d] shadow-[0_18px_60px_rgba(0,0,0,0.18)]"
                    style={{
                        backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.92) 0%, rgba(20, 28, 59, 0.72) 34%, rgba(179, 0, 30, 0.58) 58%, rgba(229, 28, 47, 0.78) 100%), url(${heroImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div className="absolute inset-0 opacity-65">
                        <div className="absolute left-[-8%] top-[-18%] h-[120%] w-[65%] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18),transparent_48%)] blur-2xl" />
                        <div className="absolute right-[-6%] top-[-10%] h-[115%] w-[70%] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.55),transparent_56%)] blur-2xl" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.18),transparent_18%),radial-gradient(circle_at_70%_40%,rgba(0,0,0,0.24),transparent_20%),radial-gradient(circle_at_45%_78%,rgba(255,255,255,0.08),transparent_18%)]" />
                    </div>

                    <div className="relative flex min-h-[220px] flex-col items-center justify-center px-6 py-10 sm:px-10 sm:py-12 md:min-h-[300px] lg:px-12 lg:py-14">
                        <div className="max-w-2xl text-center">
                            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
                                Contact Us
                            </h1>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto w-full max-w-[1400px] px-4 pb-8 sm:px-6 lg:px-8 lg:pb-12">
                <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
                    <div className="px-1 py-2 sm:px-3 lg:py-10 lg:pl-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#8b8b8b]">/ get in touch /</p>
                        <h2 className="mt-5 max-w-xl text-4xl font-medium leading-[1.02] tracking-[-0.05em] text-[#111111] sm:text-5xl lg:text-[4.1rem]">
                            We are always ready to help you and answer your questions
                        </h2>
                        <p className="mt-8 max-w-xl text-sm leading-7 text-[#7d7d7d] sm:text-[15px]">
                            Reach out for admissions, attendance support, general campus queries, or any other information you need.
                            Our team responds with clarity and care so students, parents, and visitors can get the right help quickly.
                        </p>

                        <div className="mt-10 grid gap-8 sm:grid-cols-2 sm:gap-10">
                            {contactLinks.map((item) => (
                                <div key={item.label} className="space-y-2">
                                    <h3 className="text-[15px] font-semibold text-[#111111]">{item.label}</h3>
                                    <p className="whitespace-pre-line text-[13px] leading-6 text-[#6f6f6f]">{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative px-0 pb-2 pt-1 lg:py-8">
                        <div className="mx-auto max-w-[560px] rounded-[28px] bg-[#f0f0f0] px-6 py-8 shadow-[0_12px_34px_rgba(0,0,0,0.06)] sm:px-8 sm:py-10 lg:ml-auto lg:max-w-[560px]">
                            <h3 className="text-2xl font-medium tracking-tight text-[#222222]">Get in Touch</h3>
                            <p className="mt-3 max-w-sm text-sm leading-6 text-[#6f6f6f]">
                                Define your goals and identify areas where we can help with admissions, attendance, and campus support.
                            </p>

                            <form className="mt-8 space-y-5">
                                {[
                                    "Full name",
                                    "Email",
                                    "Subject",
                                ].map((placeholder) => (
                                    <div key={placeholder} className="border-b border-[#d1d1d1] pb-2">
                                        <input
                                            type="text"
                                            placeholder={placeholder}
                                            className="w-full bg-transparent text-sm text-[#222222] outline-none placeholder:text-[#a6a6a6]"
                                        />
                                    </div>
                                ))}

                                <div className="border-b border-[#d1d1d1] pb-2">
                                    <textarea
                                        rows="4"
                                        placeholder="Message"
                                        className="w-full resize-none bg-transparent text-sm text-[#222222] outline-none placeholder:text-[#a6a6a6]"
                                    />
                                </div>

                                <button
                                    type="button"
                                    className="inline-flex items-center gap-2 rounded-full bg-[#323232] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#111111]"
                                >
                                    <span className="grid h-5 w-5 place-items-center rounded-full bg-white/10 text-xs">›</span>
                                    Send a message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto w-full max-w-[1400px] px-4 pb-10 sm:px-6 lg:px-8 lg:pb-14">
                <div className="overflow-hidden rounded-[24px] bg-white shadow-[0_18px_50px_rgba(0,0,0,0.08)]">
                    <div className="relative h-[250px] w-full bg-[#e9e9e9] sm:h-[320px] lg:h-[380px]">
                        <iframe
                            title="Campus map"
                            src="https://www.openstreetmap.org/export/embed.html?bbox=-0.1715%2C51.5079%2C-0.0910%2C51.5340&layer=mapnik"
                            className="absolute inset-0 h-full w-full grayscale"
                            loading="lazy"
                        />
                        <div className="absolute left-4 top-4 max-w-[260px] rounded-2xl bg-white px-4 py-3 shadow-lg sm:left-6 sm:top-6">
                            <p className="text-sm font-semibold text-[#111111]">Sri Guru Granth Sahib World University</p>
                            <p className="mt-1 text-xs leading-5 text-[#6f6f6f]">
                                Fatehgarh Sahib, Punjab
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactusSection;
