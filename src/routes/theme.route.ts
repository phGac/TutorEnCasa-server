import { Router } from 'express';
import { isLoggedIn, isAdministrator } from '../middlewares/session.middleware';
import ThemeController from '../controllers/theme_controller';

const router = Router();

 /**
 * @api {get} /theme/:id Obtener
 * @apiVersion 0.0.1
 * @apiName ShowTheme
 * @apiGroup Tema
 * @apiPermission Estudiante
 *
 * @apiDescription Obtener los datos un tema o todos
 *
 * @apiParam {integer} [id] Digito identificador del tema
 *
 * @apiUse ThemeController
 */
router.get(['/', '/:id'], isLoggedIn, ThemeController.show);

 /**
 * @api {post} /theme/new Crear
 * @apiVersion 0.0.1
 * @apiName CreateTheme
 * @apiGroup Tema
 * @apiPermission Tutor o Administrador
 *
 * @apiDescription Crear un tema
 *
 * @apiParam {string} name Nombre del tema
 * @apiParam {string} [description] Descripción del tema
 * @apiParam {string} [id_theme_parent] Digito identificador del tema padre. Por ej. Cálculo es hijo de Matemáticas
 *
 * @apiUse ThemeController
 */
router.post('/new', isLoggedIn, isAdministrator, ThemeController.create);

 /**
 * @api {put} /theme/:id Actualizar
 * @apiVersion 0.0.1
 * @apiName UpdateTheme
 * @apiGroup Tema
 * @apiPermission Administrador
 *
 * @apiDescription Actualizar los datos un tema
 *
 * @apiParam {string} id Digito identificador del tema
 * @apiParam {string} name [opcional] Nombre del tema
 * @apiParam {string} description [opcional] Descripción del tema
 * @apiParam {string} id_theme_parent [opcional] Digito identificador del tema padre. Por ej. Cálculo es hijo de Matemáticas
 *
 * @apiUse ThemeController
 */
router.put('/:id', isLoggedIn, isAdministrator, ThemeController.update);

 /**
 * @api {delete} /theme/:id Eliminar
 * @apiVersion 0.0.1
 * @apiName DeleteTheme
 * @apiGroup Tema
 * @apiPermission Administrador
 *
 * @apiDescription Permite elimnar los datos un tema
 *
 * @apiParam {string} id Digito identificador del tema
 *
 * @apiUse ThemeController
 */
router.delete('/:id', isLoggedIn, isAdministrator, ThemeController.destroy);

export default router;