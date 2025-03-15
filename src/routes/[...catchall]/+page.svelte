<!-- src/routes/[...catchall]/+page.svelte -->

<script>
    import { isPreviewing, Content } from "@builder.io/sdk-svelte";
    import Footer from '$lib/components/Footer.svelte';
    import Hero from '$lib/components/Hero.svelte';
    import Why from "$lib/components/Why.svelte";
    import Roadmap from "$lib/components/Roadmap.svelte";
    import BottomCTA from "$lib/components/BottomCTA.svelte";
  
    const apiKey = "7bff0c6c736b40dbaef3300a46e5008d";
    const model = "custome-page";

    const CUSTOM_COMPONENTS = [
    {
      component: Hero,
      name: 'Hero',
      inputs: [
        {
            name: 'title',
            type: 'string',
            defaultValue: 'Hello',
        },
        {
            name: 'q1',
            type: 'string',
            defaultValue: 'Why?',
        },
        {
            name: 'a1',
            type: 'string',
            defaultValue: 'Because',
        },
        {
            name: 'q2',
            type: 'string',
            defaultValue: 'What?',
        },
        {
            name: 'a2',
            type: 'string',
            defaultValue: 'This',
        },
        {
            name: 'fullBtn',
            type: 'string',
            defaultValue: 'Full Button',
        },
        {
            name: 'outlineBtn',
            type: 'string',
            defaultValue: 'Outline Button',
        },
        {
            name: 'fullBtnLink',
            type: 'string',
            defaultValue: '#',
        },
        {
            name: 'outlineBtnLink',
            type: 'string',
            defaultValue: '#',
        }
      ],
    },
    {
      component: Why,
      name: 'Cards',
      inputs: [
        { name: 'title', type: 'string', defaultValue: 'We are not a school, but you will learn a lot' },
        { name: 'text', type: 'longText', defaultValue: 'PS: if you don’t have an idea in mind, we can help!' },
        {
          name: 'cards',
          type: 'list',
          subFields: [
            { name: 'title', type: 'string', defaultValue: 'Card Title' },
            {
              name: 'description',
              type: 'richText',
              defaultValue: '',
            },
          ],
        },
      ],
    },
    {
      component: Roadmap,
      name: 'Roadmap',
      inputs: [
        { name: 'title', type: 'string', defaultValue: 'We are not a school, but you will learn a lot' },
        {
          name: 'steps',
          type: 'list',
          subFields: [
            { name: 'title', type: 'string', defaultValue: '' },
            {
              name: 'description',
              type: 'richText',
              defaultValue: '',
            },
          ],
        },
      ],
    },
    {
      component: BottomCTA,
      name: 'CTA',
      inputs: [
        { name: 'title', type: 'string', defaultValue: "I'm ready to build - sign me up!"},
        { name: 'description', type: 'longText', defaultValue: "Apply before 23.1. 23:59 (GMT+2). The action starts 25.1.2025 at 16:00." },
        { name: 'fullBtnLink', type: 'string', defaultValue: '/apply' },
        { name: 'outlineBtnLink', type: 'string', defaultValue: '/faq' },
        { name: 'fullBtn', type: 'string', defaultValue: 'Apply (4mins)' },
        { name: 'outlineBtn', type: 'string', defaultValue: 'FAQ' },
      ],
    },
    {
      component: Footer,
      name: 'Footer',
      inputs: [
        {
          name: 'links',
          type: 'list',
          defaultValue: [
        { label: 'Home', address: '/' },
        { label: 'FAQ', address: '/faq' },
        { label: 'Application', address: '/apply' }
          ],
          subFields: [
        { name: 'label', type: 'string', defaultValue: '' },
        { name: 'address', type: 'string', defaultValue: '#' },
          ]
        }
      ],
    },
  ]
  
    // this data comes from the function in `+page.server.js`, which runs on the server only
    export let data;
  
    // show unpublished content when in preview mode.
    const canShowContent = data.content || isPreviewing();
  </script>
  
  <main>
    <div class="global-container">
      <!-- TO DO: Add your Public API Key in <Content/>-->
      {#if canShowContent}
        <div>page Title: {data.content?.data?.title || "Unpublished"}</div>
        <Content
          model="s-2"
          content={data.content}
          apiKey="7bff0c6c736b40dbaef3300a46e5008d"
        />
      {:else}
        Content Not Found
      {/if}
    </div>
  </main>
    