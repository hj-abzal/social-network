import React from 'react';
import { connect } from 'react-redux';
import { AppStateType } from '../../../redux/redux-store';
import {
  changeCurrentPage,
  onFollow,
  isFollowingAC,
  setTotalUsersCount,
  toggleIsFetching,
  updateUsers,
  UsersType,
  getUsersThunk,
  onPageChanged,
  unFollow,
  follow
} from '../../../redux/UserReducer';
import { Preloader } from '../../common/preloader/Preloader';
import { Users } from './Users';




type MapDispatchPropsType = {
  onFollow: (id: number) => void
  onUnFollow: (id: number) => void
  updateUsers: (users: Array<UsersType>) => void
  changeCurrentPage: (page: number) => void
  setTotalUsersCount: (totalCount: number) => void
  toggleIsFetching: (isFetching: boolean) => void
  getUsersThunk: (currentPage: number, pageSize: number) => void

};

type UserPropsType = {
  users: UsersType[]
  pageSize: number
  totalUsersCount: number
  currentPage: number
  isFetching: boolean
  isFollowing: number[]
  follow: (userId: number) => void
  unFollow: (userId: number) => void
  updateUsers: (users: Array<UsersType>) => void
  changeCurrentPage: (page: number) => void
  setTotalUsersCount: (totalCount: number) => void
  toggleIsFetching: (isFetching: boolean) => void
  isFollowingAC: (isFetching: boolean, userId: number) => void
  getUsersThunk: (currentPage: number, pageSize: number) => void
  onPageChanged: (p: number, pageSize: number) => void


}


export class UsersContainerClass extends React.Component<UserPropsType> {


  componentDidMount() {
    this.props.getUsersThunk(this.props.currentPage, this.props.pageSize);

  }

  render() {


    return <>
      {this.props.isFetching ? <Preloader /> : ""}
      <Users {...this.props}
      />
    </>
  }
}









let mapStateToProps = (state: AppStateType) => {
  return {
    users: state.userPage.users,
    pageSize: state.userPage.pageSize,
    totalUsersCount: state.userPage.totalUsersCount,
    currentPage: state.userPage.currentPage,
    isFetching: state.userPage.isFetching,
    isFollowing: state.userPage.isFollowing

  }
}


export const UsersContainer = connect(mapStateToProps, {
  follow, unFollow, updateUsers,
  changeCurrentPage, setTotalUsersCount,
  toggleIsFetching, isFollowingAC, getUsersThunk, onPageChanged
})(UsersContainerClass);

