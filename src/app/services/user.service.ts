import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly COMMENT_VIEW_KEY = 'comment_views';

  getLastCommentView(taskName: string): string | null {
    const views = JSON.parse(
      localStorage.getItem(this.COMMENT_VIEW_KEY) || '{}'
    );
    return views[taskName] || null;
  }

  updateLastCommentView(taskName: string, date: string): void {
    const views = JSON.parse(
      localStorage.getItem(this.COMMENT_VIEW_KEY) || '{}'
    );
    views[taskName] = date;
    localStorage.setItem(this.COMMENT_VIEW_KEY, JSON.stringify(views));
  }
}
