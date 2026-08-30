---
layout: page
title: Bond Repayment Calculator
description: Estimate your monthly bond repayment on a South African home loan with the oobalink Northern Suburbs bond calculator.
background: white
full_width: true
permalink: /bond-calculator/
---

{% assign calculator = site.data.sitetext.calculator_pages.bond %}

<section class="calculator-hero">
  <div class="container calculator-hero__content">
    <p class="calculator-hero__eyebrow">{{ calculator.hero_eyebrow }}</p>
    <h1>{{ calculator.hero_title }}</h1>
    <p>{{ calculator.hero_text }}</p>
    <a class="btn btn-primary btn-xl text-uppercase" href="#{{ calculator.anchor }}">{{ site.data.sitetext.calculator_pages.cta_label }}</a>
  </div>
</section>

<section class="calculator-detail page-section" id="{{ calculator.anchor }}">
  <div class="container">
    <iframe class="calc calc--bond" frameborder="0"
        src="https://www.ooba.co.za/calculators/bond-repayment-calculator/?iframe=true&iftype=nobrand"
        title="{{ calculator.iframe_title }}"></iframe>
  </div>
</section>

<section class="calculator-faq page-section">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <div class="text-center">
          <h2 class="section-heading text-uppercase">{{ calculator.faq_title }}</h2>
          <h3 class="section-subheading text-muted">{{ site.data.sitetext.calculator_pages.faq_intro }}</h3>
        </div>

        <div class="calculator-faq__list">
          {%- for item in calculator.faqs -%}
          <details class="calculator-faq__item"{% if forloop.first %} open{% endif %}>
            <summary>{{ item.question }}</summary>
            <p>{{ item.answer }}</p>
          </details>
          {%- endfor -%}
        </div>

        <div class="calculator-faq__cta">
          <a class="btn btn-primary btn-xl text-uppercase" href="{{ '/contact/' | relative_url }}">{{ site.data.sitetext.calculator_pages.contact_label }}</a>
        </div>
      </div>
    </div>
  </div>
</section>

{% include team.html %}

