'use client';

import { makePage } from '@keystatic/next/ui/app';

import config from '../../keystatic.config';

/**
 * El editor completo. Corre en el navegador: el esquema lleva componentes
 * de React adentro, así que no puede dibujarse desde el servidor.
 */
export default makePage(config);
