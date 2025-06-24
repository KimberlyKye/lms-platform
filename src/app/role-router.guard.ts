import { Injectable, Injector, Compiler } from '@angular/core';
import {
  CanActivateChild,
  Router,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { AuthService } from './auth/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleRouterGuard implements CanActivateChild {
  constructor(
    private auth: AuthService,
    private router: Router,
    private injector: Injector
  ) {}

  async canActivateChild(route: ActivatedRouteSnapshot): Promise<boolean> {
    const role = this.auth.cr;

    // Определяем какой модуль грузить
    const modulePath =
      role === 'teacher'
        ? './teacher/teacher.module#TeacherModule'
        : './student/student.module#StudentModule';

    // Ленивая загрузка модуля
    const moduleFactory = await loadNgModuleFactory(this.injector, modulePath);
    const moduleRef = moduleFactory.create(this.injector);

    // Получаем роуты из модуля
    const router = this.injector.get(Router);
    const routes = (moduleRef?.instance as any).getRoutes();

    // Добавляем роуты динамически
    router.resetConfig([
      ...router.config.filter((c) => !(c as any)._dynamic),
      ...routes.map((r: any) => ({ ...r, _dynamic: true })),
    ]);

    return true;
  }
}

// Хелпер для загрузки модуля
export function loadNgModuleFactory(injector: Injector, path: string) {
  const compiler = injector.get(Compiler);
  return import(path).then((m) =>
    compiler.compileModuleAsync(m[Object.keys(m)[0]])
  );
}
