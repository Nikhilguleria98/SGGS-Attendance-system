import React from "react";
import { motion } from "framer-motion";
import {
	ArrowRight,
	Award,
	BookOpen,
	Building2,
	GraduationCap,
	HeartHandshake,
	Leaf,
	MapPin,
	ShieldCheck,
	Sparkles,
	Users,
} from "lucide-react";

import campusImage from "../../../assets/sggscampus.png";
import heroImage from "../../../assets/hero.png";

const AboutSection = () => {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: 0.09, delayChildren: 0.15 },
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 18 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
	};

	const highlights = [
		{
			icon: GraduationCap,
			title: "Academic depth",
			text: "Eleven faculties span sciences, arts, law, education, technology, and professional studies.",
		},
		{
			icon: ShieldCheck,
			title: "Inclusive access",
			text: "Scholarship support and free education initiatives help keep opportunity open for every student.",
		},
		{
			icon: Leaf,
			title: "Sustainable campus",
			text: "Green gardens, water conservation, and a living campus environment support long-term growth.",
		},
	];

	const stats = [
		{ value: "2008", label: "Established" },
		{ value: "11", label: "Faculties" },
		{ value: "137+", label: "Acre campus" },
		{ value: "50%", label: "Average placement rate" },
	];

	const values = [
		{
			icon: Users,
			title: "Community first",
			text: "The university culture is shaped around Sarbat-da-bhala, placing collective well-being at the center.",
		},
		{
			icon: BookOpen,
			title: "Learning by doing",
			text: "Well-equipped laboratories and smart classrooms turn theory into practical confidence.",
		},
		{
			icon: Award,
			title: "Prepared for careers",
			text: "Counselling, incubation, and mentoring help students move from campus learning into real-world impact.",
		},
	];

	const campusFacts = [
		{
			title: "Learning spaces",
			text: "Smart classrooms, departmental libraries, and practical labs keep the academic experience active and disciplined.",
		},
		{
			title: "Student support",
			text: "Scholarships, counselling, mentorship, and career guidance create a campus culture where students can stay focused.",
		},
		{
			title: "Life beyond class",
			text: "Sports, cultural events, research activities, and entrepreneurship programs help shape confident graduates.",
		},
	];

	const experiencePoints = [
		"A disciplined daily rhythm that supports attendance, punctuality, and accountability.",
		"Access to teachers, infrastructure, and peer communities that make learning collaborative.",
		"An environment that balances tradition, service, and modern academic standards.",
		"Real opportunities for placement preparation, skill building, and personal growth.",
	];

	return (
		<div className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#fff8f8_52%,#ffffff_100%)] text-[#162b4a]">
			<div className="absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(circle_at_top_left,rgba(192,0,33,0.12),transparent_42%),radial-gradient(circle_at_top_right,rgba(22,43,74,0.12),transparent_36%)]" />
			<div className="absolute -left-20 top-28 h-64 w-64 rounded-full bg-[#c00021]/10 blur-3xl" />
			<div className="absolute -right-16 top-[26rem] h-72 w-72 rounded-full bg-[#162b4a]/10 blur-3xl" />

			<section className="relative mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6 lg:px-8 lg:pb-24 lg:pt-28">
				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]"
				>
					<div className="max-w-2xl">
						<motion.div
							variants={itemVariants}
							className="inline-flex items-center gap-2 rounded-full border border-[#c00021]/15 bg-white px-4 py-2 text-sm font-semibold text-[#c00021] shadow-sm"
						>
							<Sparkles size={16} />
							About SGGSWU
						</motion.div>

						<motion.h1
							variants={itemVariants}
							className="mt-5 text-4xl font-black leading-[1.08] tracking-tight text-[#162b4a] sm:text-5xl lg:text-6xl"
						>
							A campus built on knowledge, equity, and purpose.
						</motion.h1>

						<motion.p
							variants={itemVariants}
							className="mt-6 text-base leading-8 text-slate-600 sm:text-lg"
						>
							Sri Guru Granth Sahib World University in Fatehgarh Sahib brings together academic excellence,
							cultural identity, and social responsibility. The institution blends modern learning spaces,
							disciplined administration, and a student-first environment that supports the next generation of
							scholars, innovators, and community leaders.
						</motion.p>

						<motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-3">
							<div className="flex items-center gap-2 rounded-full bg-[#162b4a] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[#162b4a]/10">
								<MapPin size={15} />
								Fatehgarh Sahib, Punjab
							</div>
							<div className="flex items-center gap-2 rounded-full border border-[#c00021]/15 bg-white px-4 py-2 text-sm font-semibold text-[#162b4a] shadow-sm">
								<HeartHandshake size={15} className="text-[#c00021]" />
								Sarbat-da-bhala in practice
							</div>
						</motion.div>

						<motion.div variants={itemVariants} className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
							{stats.map((stat) => (
								<div
									key={stat.label}
									className="rounded-2xl border border-white/70 bg-white/90 p-4 shadow-[0_20px_60px_rgba(22,43,74,0.08)] backdrop-blur"
								>
									<div className="text-2xl font-black text-[#c00021]">{stat.value}</div>
									<div className="mt-1 text-sm font-medium text-slate-600">{stat.label}</div>
								</div>
							))}
						</motion.div>
					</div>

					<motion.div
						variants={itemVariants}
						className="relative mx-auto w-full max-w-[620px] lg:max-w-none"
					>
						<div className="absolute -left-4 top-8 h-24 w-24 rounded-full bg-[#c00021]/15 blur-2xl" />
						<div className="absolute -right-6 bottom-12 h-32 w-32 rounded-full bg-[#162b4a]/15 blur-2xl" />

						<div className="grid gap-4 sm:grid-cols-2">
							<div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-[0_30px_80px_rgba(22,43,74,0.12)]">
								<img src={campusImage} alt="SGGSWU campus" className="h-64 w-full object-cover sm:h-80" />
								<div className="space-y-2 p-5">
									<div className="inline-flex items-center gap-2 rounded-full bg-[#c00021]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#c00021]">
										<Building2 size={13} />
										Campus Life
									</div>
									<p className="text-sm leading-6 text-slate-600">
										A large, thoughtfully planned campus with smart classrooms, research spaces, and student-centered
										infrastructure.
									</p>
								</div>
							</div>

							<div className="grid gap-4">
								<div className="overflow-hidden rounded-[2rem] border border-white/70 bg-[#162b4a] shadow-[0_30px_80px_rgba(22,43,74,0.16)]">
									<img src={heroImage} alt="University visual" className="h-48 w-full object-cover opacity-90" />
									<div className="space-y-2 p-5 text-white">
										<div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-white/90">
											<ShieldCheck size={13} />
											Attendance Ready
										</div>
										<p className="text-sm leading-6 text-white/80">
											Built for a disciplined academic environment where student engagement, attendance, and progress
											remain easy to monitor.
										</p>
									</div>
								</div>

								<div className="rounded-[2rem] border border-[#c00021]/10 bg-white p-5 shadow-[0_20px_60px_rgba(22,43,74,0.08)]">
									<div className="flex items-start gap-4">
										<div className="rounded-2xl bg-[#c00021]/10 p-3 text-[#c00021]">
											<BookOpen size={22} />
										</div>
										<div>
											<h3 className="text-lg font-bold text-[#162b4a]">Designed for clarity</h3>
											<p className="mt-2 text-sm leading-6 text-slate-600">
												The page layout mirrors the hero section with bold contrast, smooth spacing, and a polished
												institutional look that works on every screen size.
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				</motion.div>
			</section>

			<section className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.2 }}
					variants={containerVariants}
					className="grid gap-4 md:grid-cols-3"
				>
					{highlights.map((item) => {
						const Icon = item.icon;

						return (
							<motion.article
								key={item.title}
								variants={itemVariants}
								className="group rounded-[1.75rem] border border-white/80 bg-white p-6 shadow-[0_20px_60px_rgba(22,43,74,0.08)] transition-transform duration-300 hover:-translate-y-1"
							>
								<div className="inline-flex rounded-2xl bg-[#162b4a] p-3 text-white shadow-lg shadow-[#162b4a]/10">
									<Icon size={22} />
								</div>
								<h2 className="mt-5 text-xl font-bold text-[#162b4a]">{item.title}</h2>
								<p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
							</motion.article>
						);
					})}
				</motion.div>
			</section>

			<section className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.2 }}
					variants={containerVariants}
					className="rounded-[2.25rem] border border-white/80 bg-white/85 p-6 shadow-[0_30px_80px_rgba(22,43,74,0.08)] backdrop-blur sm:p-8"
				>
					<motion.div variants={itemVariants} className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
						<div className="max-w-2xl">
							<div className="inline-flex items-center gap-2 rounded-full bg-[#162b4a] px-4 py-2 text-sm font-semibold text-white">
								<Building2 size={15} />
								Campus at a glance
							</div>
							<h2 className="mt-4 text-3xl font-black tracking-tight text-[#162b4a] sm:text-4xl">
								A full academic ecosystem built for focus, dignity, and opportunity.
							</h2>
							<p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
								Beyond the numbers, SGGSWU is shaped by the way the campus functions every day: structured learning,
								quiet study environments, student services, practical exposure, and an atmosphere that encourages
								regular participation.
							</p>
						</div>
						<div className="rounded-2xl border border-[#c00021]/10 bg-[#c00021]/5 px-4 py-3 text-sm font-medium text-[#162b4a]">
							Built for students, teachers, and administrators alike.
						</div>
					</motion.div>

					<div className="mt-8 grid gap-4 md:grid-cols-3">
						{campusFacts.map((fact, index) => (
							<motion.article
								key={fact.title}
								variants={itemVariants}
								className={`rounded-[1.5rem] border p-6 ${
									index === 1
										? "border-[#162b4a]/10 bg-[linear-gradient(180deg,#ffffff_0%,#fff7f8_100%)]"
										: "border-white/80 bg-white"
								} shadow-[0_16px_50px_rgba(22,43,74,0.07)]`}
							>
								<div className="inline-flex rounded-2xl bg-[#162b4a] p-3 text-white">
									{index === 0 ? <GraduationCap size={20} /> : index === 1 ? <HeartHandshake size={20} /> : <Leaf size={20} />}
								</div>
								<h3 className="mt-5 text-lg font-bold text-[#162b4a]">{fact.title}</h3>
								<p className="mt-3 text-sm leading-7 text-slate-600">{fact.text}</p>
							</motion.article>
						))}
					</div>
				</motion.div>
			</section>

			<section className="relative mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
				<div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
					<motion.div
						initial={{ opacity: 0, y: 24 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.2 }}
						transition={{ duration: 0.6 }}
						className="rounded-[2rem] border border-[#162b4a]/10 bg-[#162b4a] p-8 text-white shadow-[0_30px_90px_rgba(22,43,74,0.16)]"
					>
						<div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/90">
							<Sparkles size={15} />
							University essence
						</div>

						<h2 className="mt-5 text-3xl font-black leading-tight sm:text-4xl">
							Tradition, innovation, and student care in one ecosystem.
						</h2>

						<p className="mt-4 text-sm leading-7 text-white/78 sm:text-base">
							From specialized laboratories and sports facilities to scholarships, incubation support, and vibrant
							cultural life, SGGSWU is shaped to produce graduates who are capable, grounded, and ready to contribute.
						</p>

						<div className="mt-8 space-y-4">
							{[
								"Research-led teaching with practical exposure",
								"Supportive student services and mentorship",
								"A disciplined campus environment with human warmth",
							].map((point) => (
								<div key={point} className="flex items-center gap-3 rounded-2xl bg-white/8 px-4 py-3">
									<div className="rounded-full bg-[#c00021] p-1.5 text-white">
										<ArrowRight size={14} />
									</div>
									<span className="text-sm font-medium text-white/90">{point}</span>
								</div>
							))}
						</div>
					</motion.div>

					<div className="grid gap-4 sm:grid-cols-2">
						{values.map((value, index) => {
							const Icon = value.icon;

							return (
								<motion.article
									key={value.title}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, amount: 0.2 }}
									transition={{ duration: 0.5, delay: index * 0.08 }}
									className={`rounded-[1.75rem] border p-6 shadow-[0_20px_60px_rgba(22,43,74,0.08)] ${
										index === 0
											? "border-[#c00021]/12 bg-white"
											: index === 1
												? "border-[#162b4a]/10 bg-[linear-gradient(180deg,#ffffff_0%,#fff7f8_100%)]"
												: "border-white/80 bg-white"
									}`}
								>
									<div className="inline-flex rounded-2xl bg-[#c00021]/10 p-3 text-[#c00021]">
										<Icon size={22} />
									</div>
									<h3 className="mt-5 text-lg font-bold text-[#162b4a]">{value.title}</h3>
									<p className="mt-3 text-sm leading-7 text-slate-600">{value.text}</p>
								</motion.article>
							);
						})}
					</div>
				</div>
			</section>

			<section className="relative mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
				<div className="grid gap-6 rounded-[2.25rem] border border-[#162b4a]/10 bg-[#162b4a] p-6 text-white shadow-[0_30px_90px_rgba(22,43,74,0.16)] lg:grid-cols-[0.9fr_1.1fr] lg:p-8">
					<div>
						<div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/90">
							<Users size={15} />
							Student experience
						</div>
						<h2 className="mt-5 text-3xl font-black leading-tight sm:text-4xl">
							What a student feels on the ground matters as much as what they learn in class.
						</h2>
						<p className="mt-4 text-sm leading-7 text-white/78 sm:text-base">
							This about page is intentionally longer because the institution itself is larger than a summary. SGGSWU
							combines academic seriousness with cultural grounding, and that balance is what gives the campus its
							identity.
						</p>
					</div>

					<div className="grid gap-4 sm:grid-cols-2">
						{experiencePoints.map((point, index) => (
							<div
								key={point}
								className={`rounded-[1.4rem] border border-white/10 p-4 ${index % 2 === 0 ? "bg-white/8" : "bg-white/5"}`}
							>
								<div className="mb-3 inline-flex rounded-full bg-[#c00021] p-2 text-white">
									<ArrowRight size={14} />
								</div>
								<p className="text-sm leading-7 text-white/90">{point}</p>
							</div>
						))}
					</div>
				</div>
			</section>
		</div>
	);
};

export default AboutSection;
