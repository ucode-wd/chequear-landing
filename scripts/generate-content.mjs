/**
 * generate-content.mjs
 * Reads articles.json and generates MDX files in src/content/blog/
 * Each file gets full frontmatter + article body with H2/H3 structure,
 * examples, risk section, FAQ, and soft CTA.
 *
 * Usage: node scripts/generate-content.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const articlesPath = join(__dirname, "articles.json");
const outputDir = join(__dirname, "..", "src", "content", "blog");

// Ensure output directory exists
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

const articles = JSON.parse(readFileSync(articlesPath, "utf-8"));

// --- Content templates by category ---

function generatePilarContent(article) {
  return `
## ¿Qué implica ${article.keyword}?

En Argentina, los cheques siguen siendo un instrumento de pago muy utilizado entre empresas, comerciantes y PYMES. Entender ${article.keyword} es fundamental para cualquier persona que opere con este medio de pago.

El sistema de cheques permite realizar pagos diferidos, financiar operaciones comerciales y transferir derechos de cobro mediante el endoso. Sin embargo, también conlleva riesgos que es importante conocer y gestionar adecuadamente.

### Contexto del sistema de cheques argentino

El Banco Central de la República Argentina (BCRA) regula el funcionamiento de los cheques y mantiene registros públicos de cheques rechazados y emisores inhabilitados. Esta información es clave para evaluar el riesgo antes de aceptar un cheque.

Los principales tipos de cheques son:

1. **Cheque común**: se cobra desde el momento de emisión y tiene 30 días de plazo para ser presentado al banco.
2. **Cheque de pago diferido**: tiene una fecha futura de cobro (entre 1 y 360 días) y se usa frecuentemente para financiar operaciones.
3. **ECHEQ**: versión digital del cheque emitida desde home banking o plataformas bancarias.

## Principales riesgos a considerar

Al operar con cheques, los principales riesgos son:

- **Falta de fondos**: el emisor no tiene saldo suficiente en su cuenta al momento del cobro.
- **Cheque denunciado**: el cheque fue reportado como robado o extraviado.
- **Irregularidades formales**: errores en la fecha, el monto, la firma o el endoso que causan rechazo bancario.
- **Inhabilitación del emisor**: la persona o empresa fue inhabilitada para librar cheques por el BCRA.

### ¿Cómo afectan estos riesgos a tu negocio?

Cuando un cheque es rechazado, el comerciante pierde el importe del pago y debe iniciar un proceso de reclamo que puede ser largo y costoso. En muchos casos, el dinero nunca se recupera.

Por eso, es fundamental verificar la información del emisor y del cheque antes de aceptarlo como medio de pago.

## Buenas prácticas al operar con cheques

Para minimizar riesgos al aceptar cheques, se recomienda:

1. **Verificar el historial del emisor** consultando las bases del BCRA y la Central de Deudores.
2. **Comprobar que el cheque esté correctamente completado**: fecha, monto en números y letras, firma.
3. **Verificar la cadena de endosos** si el cheque fue transferido por terceros.
4. **Consultar si el cheque tiene denuncias** o si el emisor está inhabilitado.
5. **Establecer políticas internas** para la aceptación de cheques en tu empresa.

### Ejemplo práctico

Supongamos que un cliente te ofrece pagar una factura de $500,000 con un cheque de pago diferido a 90 días. Antes de aceptarlo, sería prudente:

- Consultar si el emisor tiene historial de cheques rechazados.
- Verificar que no esté inhabilitado para librar cheques.
- Evaluar si el plazo de 90 días es aceptable para tu flujo de caja.
- Confirmar que el cheque esté correctamente llenado y firmado.

## Situaciones comerciales frecuentes

En la práctica diaria de los negocios en Argentina, es habitual encontrarse con situaciones como:

- Recibir un cheque de un **cliente nuevo** sin historial previo.
- Aceptar un cheque **endosado por un tercero** que no conocés.
- Negociar con cheques de **plazos largos** (90, 180 o 360 días).
- Operar con **montos elevados** que requieren mayor precaución.

En todos estos casos, la verificación previa del cheque y del emisor puede evitar pérdidas significativas.

## Preguntas frecuentes

### ¿Cómo puedo consultar si un cheque fue rechazado?

Podés consultar las bases del BCRA ingresando el número de CUIT del emisor. También existen herramientas como ChequeAR que simplifican esta consulta.

### ¿Qué pasa si acepto un cheque y luego es rechazado?

Si el cheque es rechazado, podés intimar al emisor por escrito para que abone el importe. Si no responde, podés iniciar una acción legal.

### ¿Es seguro aceptar cheques de empresas desconocidas?

No es seguro sin antes verificar el historial financiero de la empresa. Es recomendable consultar la Central de Deudores del BCRA y el estado del CUIT en ARCA.

## Conclusión

Operar con cheques en Argentina requiere conocimiento y precaución. La mejor estrategia para proteger tu negocio es verificar siempre la información del emisor y del cheque antes de aceptarlo. Herramientas como ChequeAR te permiten realizar este análisis en segundos, consultando las bases oficiales del BCRA directamente desde tu celular.
`;
}

function generateEducativoContent(article) {
  return `
## ¿Qué necesitás saber sobre ${article.keyword}?

Cuando operás con cheques en Argentina, es fundamental entender conceptos como ${article.keyword}. Este conocimiento te permite tomar mejores decisiones y evitar problemas que pueden afectar tu negocio o tus finanzas personales.

### ¿Por qué es importante?

Muchos comerciantes y empresas aceptan cheques sin realizar las verificaciones necesarias. Esto puede resultar en pérdidas económicas significativas cuando el cheque es rechazado por el banco.

Entender ${article.keyword} te da las herramientas para:

- Evaluar correctamente el riesgo de cada operación.
- Identificar señales de alerta antes de aceptar un pago.
- Conocer tus derechos y opciones en caso de problemas.

## Aspectos clave a considerar

### 1. Verificación previa

Antes de aceptar cualquier cheque, es recomendable:

- Consultar el historial del emisor en las bases del BCRA.
- Verificar que el cheque esté correctamente completado.
- Confirmar que no existan denuncias sobre el cheque.

### 2. Señales de alerta

Prestá atención a estas señales que pueden indicar un riesgo mayor:

- El emisor tiene historial de cheques rechazados.
- El cheque tiene múltiples endosos.
- El monto es inusualmente alto para la operación.
- El emisor insiste en plazos muy largos.

### 3. Documentación

Siempre es conveniente:

- Guardar una copia del cheque antes de depositarlo.
- Registrar los datos del emisor y la operación comercial.
- Solicitar documentación adicional si el monto lo justifica.

## Ejemplo de situación real

Imaginá que tenés un comercio y un cliente habitual te paga con un cheque de pago diferido a 60 días. Aunque lo conocés, su situación financiera puede haber cambiado. Una consulta rápida al historial del emisor puede revelarte si tiene cheques rechazados recientes o si su situación crediticia cambió.

## Riesgos asociados

Los principales riesgos relacionados con ${article.keyword} incluyen:

1. **Pérdida económica directa** si el cheque es rechazado y no podés cobrar.
2. **Costos de gestión** por el tiempo y recursos invertidos en el reclamo.
3. **Impacto en el flujo de caja** si dependías de ese cobro para cubrir compromisos.
4. **Riesgo legal** si el cheque involucra situaciones irregulares.

## Preguntas frecuentes

### ¿Cómo puedo reducir el riesgo al aceptar cheques?

La mejor forma es verificar el historial del emisor antes de aceptar el cheque. Consultá las bases del BCRA y la Central de Deudores para conocer la situación financiera del emisor.

### ¿Qué hago si un cheque es rechazado?

Debés intimar al emisor por escrito para que abone el importe. Si no lo hace en el plazo legal, podés iniciar acciones judiciales.

### ¿Existe alguna herramienta para verificar cheques rápidamente?

Sí, herramientas como ChequeAR te permiten analizar el riesgo de un cheque en segundos consultando las bases oficiales del BCRA.

## Conclusión

Conocer aspectos como ${article.keyword} es esencial para cualquier persona o empresa que opere con cheques en Argentina. La prevención y la verificación son las mejores herramientas para proteger tu negocio. Antes de aceptar un cheque, considerá utilizar herramientas de verificación que te permitan tomar una decisión informada.
`;
}

function generateLongTailContent(article) {
  return `
## ${article.title}

Esta es una situación frecuente para comerciantes y empresas en Argentina. Cuando se trata de ${article.keyword}, es importante conocer los riesgos involucrados y las verificaciones que podés realizar antes de tomar una decisión.

### ¿Cuál es el riesgo real?

Al enfrentar una situación relacionada con ${article.keyword}, los principales riesgos incluyen:

- **Rechazo por falta de fondos**: el emisor puede no tener saldo al momento del cobro.
- **Irregularidades formales**: errores en el cheque que causen rechazo bancario.
- **Denuncias**: el cheque podría estar denunciado como robado o perdido.
- **Historial negativo**: el emisor puede tener antecedentes de cheques rechazados.

### Qué verificar antes de decidir

Para evaluar esta situación correctamente, seguí estos pasos:

1. **Consultá el CUIT del emisor** en la Central de Deudores del BCRA.
2. **Verificá si tiene cheques rechazados** en los últimos 12 meses.
3. **Comprobá que el cheque esté bien llenado**: fecha, monto, firma y endosos.
4. **Confirmá que no existan denuncias** sobre el cheque.

### Ejemplo práctico

Un comerciante en Buenos Aires recibe un cheque en esta situación. Antes de aceptarlo, decide consultar el historial del emisor y descubre que tiene dos cheques rechazados en los últimos 6 meses. Esta información le permite negociar una forma de pago alternativa y evitar una posible pérdida.

## Recomendaciones prácticas

- **No aceptes por presión**: si el emisor te apura, es una señal de alerta.
- **Verificá siempre**: incluso con clientes conocidos, la situación financiera puede cambiar.
- **Establecé políticas claras**: definí qué cheques acepta tu negocio y bajo qué condiciones.
- **Documentá todo**: guardá registro de cada operación con cheques.

## Preguntas frecuentes

### ¿Es obligatorio aceptar cheques como medio de pago?

No, los comerciantes no están obligados a aceptar cheques. Es tu decisión y tu derecho establecer qué medios de pago aceptás.

### ¿Qué pasa si acepto y luego hay problemas?

Si el cheque es rechazado, podés reclamar al emisor mediante intimación escrita y eventualmente por vía judicial.

## Conclusión

Ante una situación de ${article.keyword}, lo más importante es verificar antes de aceptar. Una consulta rápida al historial del emisor puede ahorrarte problemas y pérdidas económicas. Herramientas como ChequeAR facilitan esta verificación en segundos desde tu celular.
`;
}

// --- Generate files ---

let created = 0;
let skipped = 0;

for (const article of articles) {
  const filename = `${article.slug}.mdx`;
  const filepath = join(outputDir, filename);

  // Skip if file already exists
  if (existsSync(filepath)) {
    skipped++;
    continue;
  }

  const date = article.date || "2026-03-17";

  // Generate body based on category
  let body;
  switch (article.category) {
    case "pilar":
      body = generatePilarContent(article);
      break;
    case "educativo":
      body = generateEducativoContent(article);
      break;
    case "long-tail":
      body = generateLongTailContent(article);
      break;
    default:
      body = generateEducativoContent(article);
  }

  const frontmatter = `---
title: "${article.title}"
slug: "${article.slug}"
description: "${article.description}"
keyword: "${article.keyword}"
category: "${article.category}"
cluster: "${article.cluster}"
tags: ${JSON.stringify(article.tags)}
date: "${date}"
---`;

  const content = `${frontmatter}\n${body}`;

  writeFileSync(filepath, content, "utf-8");
  created++;
}

console.log(`✅ Generated ${created} MDX files`);
if (skipped > 0) {
  console.log(`⏭️  Skipped ${skipped} files (already exist)`);
}
console.log(`📁 Output directory: ${outputDir}`);
