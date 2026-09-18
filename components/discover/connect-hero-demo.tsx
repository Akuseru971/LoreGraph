"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Shuffle } from "lucide-react";
import Link from "next/link";
import { characterBySlug } from "@/data";
import { EntityPortrait } from "@/components/entity-portrait";
import { Button } from "@/components/ui/button";
import { INSPIRATION_PAIRS } from "@/lib/connect/inspiration";

const DEMO = INSPIRATION_PAIRS[0];

export function ConnectHeroDemo() {
  const reduceMotion = useReducedMotion();
  const from = characterBySlug.get(DEMO.from);
  const to = characterBySlug.get(DEMO.to);
  if (!from || !to) return null;

  return (
    <section
      aria-labelledby="connect-demo-heading"
      className="panel mx-auto mt-12 max-w-3xl border-gold/20 bg-white/[0.02] p-5 sm:mt-14 sm:p-8"
    >
      <p id="connect-demo-heading" className="text-eyebrow text-gold text-center">
        How are they connected?
      </p>

      <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-6">
        <DemoChampion character={from} />
        <motion.div
          aria-hidden
          className="flex flex-col items-center gap-1 text-gold/70"
          animate={reduceMotion ? undefined : { opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="size-5 sm:rotate-[-90deg]" />
          <span className="text-eyebrow text-muted">1 direct canon</span>
        </motion.div>
        <DemoChampion character={to} />
      </div>

      <p className="text-muted mx-auto mt-6 max-w-md text-center text-sm leading-relaxed">
        Some rivalries are obvious. Others take a few thousand years to explain.
      </p>

      <div className="mt-6 flex flex-col items-stretch justify-center gap-2 sm:flex-row sm:items-center">
        <Button asChild variant="primary" size="lg" className="w-full sm:w-auto">
          <Link href={`/connect?from=${from.slug}&to=${to.slug}`}>
            Connect any two champions
          </Link>
        </Button>
        <Button asChild variant="ghost" size="lg" className="w-full sm:w-auto">
          <Link href="/connect">
            <Shuffle aria-hidden />
            Surprise me
          </Link>
        </Button>
      </div>
    </section>
  );
}

function DemoChampion({ character }: { character: { slug: string; name: string; assetKey: string; accentColor: string; title: string } }) {
  return (
    <div className="flex flex-col items-center text-center">
      <EntityPortrait
        assetKey={character.assetKey}
        name={character.name}
        accentColor={character.accentColor}
        className="size-20 border-2 border-gold/40 sm:size-24"
        sizes="96px"
      />
      <p className="text-parchment mt-3 text-sm font-medium tracking-wide uppercase">
        {character.name}
      </p>
    </div>
  );
}
