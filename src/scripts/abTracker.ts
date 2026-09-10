import { track } from "@vercel/analytics";

export function initABTracking() {
    if (typeof window === "undefined") return;

    // Get current assigned variant
    const variant = document.documentElement.getAttribute("data-ab-variant") || "A";
    const variantLabel = variant === "B" ? "Variante B (Sin Precios / Cotización)" : "Variante A (Con Precios)";

    // Track experiment view in Vercel Analytics
    try {
        track("ab_pricing_experiment_view", {
            variant: variant,
            url: window.location.pathname,
        });
    } catch (e) {
        // Analytics fallback
    }

    // 1. Tag all outgoing links to the App and Stores with the variant
    const links = document.querySelectorAll<HTMLAnchorElement>("a[href*='app.chequearapp.com.ar'], a[href*='play.google.com'], a[href*='apps.apple.com']");
    
    links.forEach((link) => {
        try {
            const url = new URL(link.href);
            url.searchParams.set("utm_source", "landing");
            url.searchParams.set("utm_campaign", "ab_pricing");
            url.searchParams.set("ab_variant", variant);
            link.href = url.toString();
        } catch (e) {
            // Relative or malformed URL fallback
        }

        // Track clicks
        link.addEventListener("click", () => {
            const destination = link.href.includes("play.google.com")
                ? "android_store"
                : link.href.includes("apps.apple.com")
                ? "ios_store"
                : "web_app";

            try {
                track("app_click", {
                    variant: variant,
                    destination: destination,
                    text: link.innerText.trim() || "link",
                });
            } catch (err) {
                // Ignore analytics errors
            }
        });
    });

    // 2. Set the hidden input in Contact form for EmailJS
    const hiddenVariantInput = document.getElementById("ab_variant_input") as HTMLInputElement | null;
    if (hiddenVariantInput) {
        hiddenVariantInput.value = variantLabel;
    }
}
