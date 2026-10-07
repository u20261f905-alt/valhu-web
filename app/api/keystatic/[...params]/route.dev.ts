import { makeRouteHandler } from '@keystatic/next/route-handler';

import { EDITOR_HABILITADO } from '@/lib/editor-habilitado';
import config from '../../../../keystatic.config';

/**
 * Atiende lo que el editor necesita: leer y guardar archivos en tu
 * computadora, y hablar con GitHub cuando está conectado.
 *
 * La puerta se cierra aquí además de en la pantalla. De nada sirve esconder
 * el editor si quien quiera puede llamar directo a esta dirección.
 */
const handlers = makeRouteHandler({ config });

const cerrado = () => new Response('Not found', { status: 404 });

export const GET = EDITOR_HABILITADO ? handlers.GET : cerrado;
export const POST = EDITOR_HABILITADO ? handlers.POST : cerrado;
