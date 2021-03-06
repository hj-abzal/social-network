import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { AppStateType } from '../../App/redux-store';
import { Preloader } from '../../components/preloader/Preloader';
import {withAuthRedirect} from '../../components/HOC/withAuthRedirect'
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
} from './userReducer';
import { Users } from './Users';



type mapStateToPropsType = {
  users: UsersType[]
  pageSize: number
  totalUsersCount: number
  currentPage: number
  isFetching: boolean
  isFollowing: number[]
}


type MapDispatchPropsType = {
  follow: (userId: number) => void
  unFollow: (userId: number) => void
  updateUsers: (users: Array<UsersType>) => void
  changeCurrentPage: (page: number) => void
  setTotalUsersCount: (totalCount: number) => void
  toggleIsFetching: (isFetching: boolean) => void
  isFollowingAC: (isFetching: boolean, userId: number) => void
  getUsersThunk: (currentPage: number, pageSize: number) => void
  onPageChanged: (pageNumber: number) => void
};

type UserPropsType = mapStateToPropsType & MapDispatchPropsType;


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


export default compose<React.ComponentType>(
  connect(mapStateToProps, {
    follow, unFollow, updateUsers,
    changeCurrentPage, setTotalUsersCount,
    toggleIsFetching, isFollowingAC, getUsersThunk, onPageChanged
  }),
  withAuthRedirect
)(UsersContainerClass)