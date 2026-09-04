{
  "task": "Harden the existing portfolio for accessibility, keyboard usability, motion preferences, CTA correctness, and production readiness.",
  "mode": "implementation",
  "scope": "All findings from the latest full-mode review, including shared components and implemented routes.",
  "primary_goal": "Fix every HIGH and MEDIUM finding from the review without changing the established visual identity, editorial design language, content strategy, routing structure, project-card consolidation, concrete project metrics, or About timeline target fix.",
  "constraints": [
    "Do not redesign the portfolio.",
    "Do not replace the existing visual direction.",
    "Do not remove useful content merely to make the implementation easier.",
    "Prefer shared primitives and reusable utilities over duplicated fixes.",
    "Preserve the existing responsive behavior and dark editorial aesthetic.",
    "Do not invent project information, URLs, metrics, or demo availability.",
    "Use the existing data.ts project data as the source of truth.",
    "Do not create fake links such as href=\"#\".",
    "Do not claim a feature is fixed unless the implementation actually supports it.",
    "Keep changes focused on the findings below.",
    "After implementation, re-check every finding and report what was changed."
  ],
  "findings_to_fix": {
    "high": [
      {
        "id": "HIGH-001",
        "title": "Mobile navigation must be keyboard-safe",
        "file": "Nav.tsx",
        "requirements": [
          "Treat the open mobile navigation as a proper modal/dialog-style interaction.",
          "Move focus into the mobile navigation when it opens.",
          "Trap keyboard focus inside the open navigation.",
          "Restore focus to the element that opened the navigation when it closes.",
          "Close the navigation when Escape is pressed.",
          "Prevent keyboard users from tabbing into the page behind the open navigation.",
          "Prevent background interaction while the mobile navigation is open using an appropriate inert/aria-hidden strategy.",
          "Ensure the menu button exposes its expanded state with aria-expanded.",
          "Ensure the menu has an accessible name/relationship.",
          "Do not break mouse, touch, or responsive behavior."
        ]
      },
      {
        "id": "HIGH-002",
        "title": "Respect prefers-reduced-motion consistently",
        "files": [
          "primitives.tsx",
          "Root.tsx",
          "Terminal.tsx"
        ],
        "requirements": [
          "Implement a shared reduced-motion mechanism rather than isolated one-off checks.",
          "Respect prefers-reduced-motion: reduce across page transitions.",
          "Respect it for scroll reveal animations.",
          "Respect it for timeline movement.",
          "Respect it for Matrix canvas animation.",
          "Respect it for marquee movement.",
          "Preserve content and visual hierarchy when animation is disabled.",
          "Reduced motion should disable or substantially minimize non-essential movement rather than merely slowing it down.",
          "Ensure the default experience remains unchanged for users who do not request reduced motion."
        ]
      },
      {
        "id": "HIGH-003",
        "title": "Fix case-study demo CTA links",
        "file": "CaseStudy.tsx",
        "data_source": "data.ts",
        "requirements": [
          "Remove every href=\"#\" used for project demo CTAs.",
          "Use the project's existing demo information from data.ts.",
          "Do not invent URLs.",
          "For projects with a real external demo URL, link to that URL.",
          "For projects marked private, local-only, unavailable, or equivalent, do not render a misleading external link.",
          "Represent private/local-only/demo-unavailable states honestly in the UI.",
          "Ensure the CTA communicates what will happen before the user activates it.",
          "Preserve the existing case-study visual design."
        ]
      }
    ],
    "medium": [
      {
        "id": "MEDIUM-001",
        "title": "Add visible keyboard focus indicators",
        "files": [
          "Contact.tsx",
          "Nav.tsx",
          "Home.tsx"
        ],
        "requirements": [
          "Add a consistent :focus-visible treatment to interactive elements.",
          "Do not rely only on subtle border-color changes.",
          "Focus indicators must remain clearly visible against the dark editorial background.",
          "Ensure sufficient contrast and a clearly perceivable keyboard position.",
          "Apply the treatment consistently to links, buttons, navigation items, filters, form controls, and other custom interactive elements.",
          "Prefer a shared focus-visible utility/class/token where practical.",
          "Do not remove native focus behavior without replacing it with an equivalent or stronger visible indicator."
        ]
      },
      {
        "id": "MEDIUM-002",
        "title": "Improve Contact form autofill and clipboard feedback",
        "file": "Contact.tsx",
        "requirements": [
          "Add appropriate autocomplete metadata to all relevant contact fields.",
          "Use semantic input types where appropriate.",
          "Use appropriate autocomplete values such as name, email, organization, and message-related fields where applicable.",
          "Do not set copied=true in a finally block.",
          "Only announce copy success after navigator.clipboard.writeText() actually succeeds.",
          "If clipboard access fails or is unavailable, do not display a success message.",
          "Provide an honest failure/fallback state when appropriate.",
          "Preserve the existing visual design and interaction."
        ]
      },
      {
        "id": "MEDIUM-003",
        "title": "Expose project filter state to assistive technology",
        "files": [
          "Projects.tsx",
          "Home.tsx"
        ],
        "requirements": [
          "Use aria-pressed or an equivalent semantic mechanism for selectable filter buttons.",
          "Clearly expose which filter is currently active.",
          "Give the filter controls an accessible group label.",
          "Ensure the active state is communicated to screen-reader users.",
          "Do not change the existing visual filter design unnecessarily.",
          "Ensure keyboard users can navigate and operate every filter."
        ]
      },
      {
        "id": "MEDIUM-004",
        "title": "Fix empty Core Stack SVG elements",
        "file": "Home.tsx",
        "requirements": [
          "Inspect the eight empty SVG elements currently rendered in the Core Stack marquee.",
          "Do not leave empty SVG placeholders in the production UI.",
          "If the intended stack icons/assets already exist in the project, use them.",
          "If meaningful icon paths are available locally, render them correctly with appropriate accessibility semantics.",
          "If there is no valid visual asset, replace the empty SVG with a deliberate text/icon treatment that fits the existing design.",
          "Do not invent logos or inaccurate technology branding.",
          "Ensure the Core Stack section visually communicates actual stack information rather than unfinished placeholders.",
          "Respect reduced-motion preferences for the marquee."
        ]
      },
      {
        "id": "MEDIUM-005",
        "title": "Make Matrix Terminal mode accessible and motion-safe",
        "file": "Terminal.tsx",
        "requirements": [
          "Respect prefers-reduced-motion for Matrix animation.",
          "Provide a reduced-motion/static alternative rather than running uninterrupted full-screen animation.",
          "Expose Matrix mode state changes to assistive technology where appropriate.",
          "Do not rely exclusively on visible terminal text such as 'press Esc' as the keyboard interaction explanation.",
          "Ensure Escape reliably exits Matrix mode.",
          "Ensure keyboard focus remains understandable while Matrix mode is active.",
          "Avoid disorienting or unnecessary continuous animation for reduced-motion users.",
          "Preserve the existing Terminal experience for users without reduced-motion preferences."
        ]
      },
      {
        "id": "MEDIUM-006",
        "title": "Restore production Vite entry document",
        "file": "index.html",
        "requirements": [
          "Investigate why pnpm run build currently fails with 'Could not resolve entry module index.html'.",
          "Restore or create the correct Vite entry document based on the existing project structure.",
          "Do not create an arbitrary minimal index.html that bypasses the application's intended setup.",
          "Ensure the entry document correctly references the existing application entry point and required metadata.",
          "Run the production build after fixing it.",
          "Do not consider this task complete until pnpm run build succeeds, unless the environment itself prevents verification.",
          "If the build still fails for an unrelated reason, identify the exact remaining blocker."
        ]
      }
    ]
  },
  "implementation_guidance": {
    "accessibility": [
      "Prefer semantic HTML over ARIA whenever possible.",
      "Use ARIA only where native semantics are insufficient.",
      "Use :focus-visible rather than removing focus outlines globally.",
      "Ensure keyboard interaction is equivalent to pointer interaction.",
      "Ensure modal/dialog interactions manage focus correctly.",
      "Ensure dynamic status messages use appropriate live-region semantics without excessive announcements."
    ],
    "motion": [
      "Create one reusable reduced-motion utility/hook/context where appropriate.",
      "Avoid duplicating matchMedia('prefers-reduced-motion') logic throughout components.",
      "CSS animations should also respect the media query where applicable.",
      "JavaScript/canvas animations must independently check reduced-motion because CSS media queries cannot stop JS animation logic by themselves.",
      "Reduced motion should favor instant state changes and static layouts."
    ],
    "data_integrity": [
      "Treat data.ts as the source of truth for project metadata.",
      "Do not fabricate demo URLs.",
      "Normalize demo states if necessary so CaseStudy.tsx can distinguish external, private, local-only, and unavailable demos.",
      "If changing the project data shape, update all consumers safely."
    ],
    "visual_preservation": [
      "Keep the current typography.",
      "Keep the current spacing system.",
      "Keep the current dark/editorial visual language.",
      "Keep existing project cards and metrics.",
      "Keep existing router structure.",
      "Keep the About timeline implementation that was already judged sound.",
      "Focus indicators may add a small visible accessibility treatment but should remain visually consistent with the design."
    ]
  },
  "verification": {
    "required": true,
    "checks": [
      "Run pnpm run build.",
      "Verify there are no href=\"#\" project demo CTAs remaining.",
      "Verify mobile navigation can be fully operated using keyboard only.",
      "Verify Escape closes mobile navigation.",
      "Verify focus enters the mobile navigation when opened.",
      "Verify focus returns to the trigger when mobile navigation closes.",
      "Verify background content cannot be keyboard-focused while mobile navigation is open.",
      "Verify all major interactive elements have visible :focus-visible states.",
      "Verify project filters expose their selected state with aria-pressed or equivalent semantics.",
      "Verify filter controls have an accessible group label.",
      "Verify Contact fields have appropriate autocomplete metadata.",
      "Verify clipboard success is only announced after successful copying.",
      "Verify clipboard failure does not falsely announce success.",
      "Verify all major animations respond to prefers-reduced-motion.",
      "Verify Matrix mode responds to reduced motion.",
      "Verify Matrix mode can be exited with Escape.",
      "Verify Core Stack contains no empty placeholder SVGs.",
      "Verify Core Stack still displays the intended technology information.",
      "Verify production build succeeds after all changes."
    ]
  },
  "final_report": {
    "format": "structured",
    "include": [
      "Files changed",
      "Summary of each fix",
      "Accessibility improvements",
      "Reduced-motion improvements",
      "CTA/data-model changes",
      "Build verification result",
      "Any remaining warnings or blockers",
      "Any finding that could not be fixed and why"
    ],
    "completion_rule": "Do not stop after fixing only the HIGH findings. Address every HIGH and MEDIUM finding listed in this prompt."
  }
}