import React from 'react'
import Link from 'next/link'

export function CookiePolicy(): React.ReactElement {
  return (
    <div>
      <h1>Cookie Policy for Alic3dev</h1>
      <p>
        This is the Cookie Policy for Alic3dev, accessible from{' '}
        <Link href="/">alic3.dev</Link>.
      </p>

      <h2>What Are Cookies</h2>
      <p>
        As is common practice with almost all professional websites this site
        uses cookies, which are tiny files that are downloaded to your computer,
        to improve your experience. This page describes what information they
        gather, how we use it and why we sometimes need to store these cookies.
        We will also share how you can prevent these cookies from being stored
        however this may downgrade or &apos;break&apos; certain elements of the
        sites functionality.
      </p>

      <h2>How We Use Cookies</h2>
      <p>
        We use cookies for a variety of reasons detailed below. Unfortunately in
        most cases there are no industry standard options for disabling cookies
        without completely disabling the functionality and features they add to
        this site. It is recommended that you leave on all cookies if you are
        not sure whether you need them or not in case they are used to provide a
        service that you use.
      </p>

      <h2>Disabling Cookies</h2>
      <p>
        You can prevent the setting of cookies by adjusting the settings on your
        browser (see your browser Help for how to do this). Be aware that
        disabling cookies will affect the functionality of this and many other
        websites that you visit. Disabling cookies will usually result in also
        disabling certain functionality and features of the this site. Therefore
        it is recommended that you do not disable cookies.
      </p>

      <h2>The Cookies We Set</h2>
      <ul>
        <li>
          <p>Forms related cookies</p>
          <p>
            When you submit data to through a form such as those found on
            contact pages or comment forms cookies may be set to remember your
            user details for future correspondence.
          </p>
        </li>

        <li>
          <p>Site preferences cookies</p>
          <p>
            In order to provide you with a great experience on this site we
            provide the functionality to set your preferences for how this site
            runs when you use it. In order to remember your preferences we need
            to set cookies so that this information can be called whenever you
            interact with a page is affected by your preferences.
          </p>
        </li>
      </ul>

      <h2>Third Party Cookies</h2>
      <p>
        In some special cases we also use cookies provided by trusted third
        parties. The following section details which third party cookies you
        might encounter through this site.
      </p>

      <ul>
        <li>
          <p>
            Third party analytics are used to track and measure usage of this
            site so that we can continue to produce engaging content. These
            cookies may track things such as how long you spend on the site or
            pages you visit which helps us to understand how we can improve the
            site for you.
          </p>
        </li>

        <li>
          <p>
            From time to time we test new features and make subtle changes to
            the way that the site is delivered. When we are still testing new
            features these cookies may be used to ensure that you receive a
            consistent experience whilst on the site whilst ensuring we
            understand which optimisations our users appreciate the most.
          </p>
        </li>
      </ul>

      <h2>More Information</h2>
      <p>
        Hopefully that has clarified things for you and as was previously
        mentioned if there is something that you aren&apos;t sure whether you
        need or not it&apos;s usually safer to leave cookies enabled in case it
        does interact with one of the features you use on our site.
      </p>

      <p>
        However if you are still looking for more information then you can
        contact us through one of our preferred contact methods:
      </p>

      <ul>
        <li>
          Email: <a href="mailto:cookies@alic3.dev">cookies@alic3.dev</a>
        </li>
      </ul>
    </div>
  )
}
