<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import SlideIn from '$lib/components/SlideIn.svelte';
</script>

<svelte:head>
	<title>Effortless Interior Design | Services</title>
</svelte:head>

<main>
	<PageHeader title="Services" />
	<SlideIn>
		<SectionHeader header="Interior Design" headerTag="h2" />
		<p>
			A comprehensive decorative design service for clients seeking exceptional quality and complete
			peace of mind. Every element is thoughtfully considered, ensuring a cohesive and characterful
			result of the highest standard.
		</p>
		<p>
			This service is tailored for those who value exquisite materials, expert curation and
			meticulous attention to detail. Holly oversees every stage of the decorative design process,
			from initial concept through to procurement and installation, collaborating closely with you
			to create a home that feels deeply personal, comfortable, and rooted in your home's history.
		</p>
		<p>
			Effortless Interior Design does not provide project management services, but Holly is
			available for consultations on build-related matters and design oversight throughout the
			process.
		</p>
	</SlideIn>

	<SlideIn>
		<SectionHeader header="Remote Interior Design" headerTag="h2" />
		<p>
			A tailored interior design service for clients based further afield, offering the same level
			of design excellence, attention to detail, and personalised care as a full in-person project.
			Working from photographs, floorplans and video tours, Holly creates a beautifully bespoke
			decorative scheme that responds thoughtfully to the architecture, atmosphere and practical
			needs of the space.
		</p>
		<p>
			Each project includes a full specification - from fabrics, furnishings and finishes - all
			sourced from trusted, international suppliers. You’ll receive a cohesive, expertly curated
			plan with clear guidance on how to bring it to life, giving you the confidence to manage the
			implementation locally, at your own pace.
		</p>
		<p>
			Holly is also available to travel to site at key stages, and can employ her trusted UK-based
			network of makers, curtain workrooms and suppliers on request, ensuring a high level of finish
			wherever the project is based.
		</p>
	</SlideIn>

	<SlideIn>
		<SectionHeader header="Consultations - Online & In-Person" headerTag="h2" />
		<p>
			For clients seeking focused advice or a fresh pair of eyes. Consultations are a flexible way
			to get expert input on anything from fabric choices to furniture layouts, paint colours,
			window treatments or design dilemmas. In-person consultations are available in London and
			surrounding areas, with online sessions available worldwide. Whether you're stuck on a
			specific decision or looking to sense-check your ideas, a consultation can help you move
			forward with clarity and confidence.
		</p>
	</SlideIn>
	<SlideIn>
		<SectionHeader header="Let's Get Started" headerTag="h2" />
		<p></p>
		<p>
			If you would like to explore working together, please use the button below - or send an email
			to <a href="mailto:info@effortlessinteriordesign.com">info@effortlessinteriordesign.com</a> - to
			request a copy of my portfolio, set up an introductory call, or simply to tell me about your project.
		</p>
	</SlideIn>
</main>
