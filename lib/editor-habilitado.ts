/**
 * ¿Se puede abrir el editor de contenidos en este entorno?
 *
 * En tu computadora, siempre. En la web publicada, solo cuando está
 * conectado a GitHub, porque es GitHub quien se encarga de pedir usuario y
 * contraseña y de comprobar que esa persona tenga permiso en el repositorio.
 *
 * Sin esa conexión, el editor guardaría en el disco del servidor sin
 * preguntarle nada a nadie. Por eso ahí queda cerrado: cualquiera que
 * escribiera la dirección entraría.
 */
export const EDITOR_HABILITADO =
  process.env.NODE_ENV === 'development' ||
  process.env.NEXT_PUBLIC_KEYSTATIC_MODO === 'github';
