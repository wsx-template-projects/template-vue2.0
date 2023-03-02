import { AppStateType } from '../store/modules/app/state'

// vuex state 的模块的类型
type ModuleType = {
    app: AppStateType
    //   console: ConsoleStateType
    //   user: UserStateType & { team: TeamStateType }
}

// 所有的StateType
export type StateType = ModuleType
