import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService
  ) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      switchMap(({ query }) =>
        this.apiService.getFilteredUsers(query).pipe(
          map((users) => UserActions.loadUsersSuccess({ users })),
          catchError((error) =>
            of(UserActions.loadUsersFailure({ error: error.message || 'Failed to load users' }))
          )
        )
      )
    )
  );

  loadAgents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadAgents),
      switchMap(({ query }) =>
        this.apiService.getFilteredAgents(query).pipe(
          map((agents) => UserActions.loadAgentsSuccess({ agents })),
          catchError((error) =>
            of(UserActions.loadAgentsFailure({ error: error.message || 'Failed to load agents' }))
          )
        )
      )
    )
  );

  loadBuyers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadBuyers),
      switchMap(({ query }) =>
        this.apiService.getFilteredBuyers(query).pipe(
          map((buyers) => UserActions.loadBuyersSuccess({ buyers })),
          catchError((error) =>
            of(UserActions.loadBuyersFailure({ error: error.message || 'Failed to load buyers' }))
          )
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      switchMap(({ id, request }) =>
        this.apiService.updateUser(id, request).pipe(
          map((user) => UserActions.updateUserSuccess({ user })),
          catchError((error) =>
            of(UserActions.updateUserFailure({ error: error.message || 'Failed to update user' }))
          )
        )
      )
    )
  );

  updateAgent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateAgent),
      switchMap(({ id, request }) =>
        this.apiService.updateAgent(id, request).pipe(
          map((agent) => UserActions.updateAgentSuccess({ agent })),
          catchError((error) =>
            of(UserActions.updateAgentFailure({ error: error.message || 'Failed to update agent' }))
          )
        )
      )
    )
  );

  updateBuyer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateBuyer),
      switchMap(({ id, request }) =>
        this.apiService.updateBuyer(id, request).pipe(
          map((buyer) => UserActions.updateBuyerSuccess({ buyer })),
          catchError((error) =>
            of(UserActions.updateBuyerFailure({ error: error.message || 'Failed to update buyer' }))
          )
        )
      )
    )
  );

  changePassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.changePassword),
      switchMap(({ id, request }) =>
        this.apiService.changePassword(id, request).pipe(
          map(() => UserActions.changePasswordSuccess()),
          catchError((error) =>
            of(UserActions.changePasswordFailure({ error: error.message || 'Failed to change password' }))
          )
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteUser),
      switchMap(({ id }) =>
        this.apiService.deleteUser(id).pipe(
          map(() => UserActions.deleteUserSuccess({ id })),
          catchError((error) =>
            of(UserActions.deleteUserFailure({ error: error.message || 'Failed to delete user' }))
          )
        )
      )
    )
  );
}