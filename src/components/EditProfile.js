import React, { Component } from 'react';
import { Redirect } from 'react-router';
import DropZone from 'react-dropzone';

import * as api from '../util/api'

class EditProfile extends Component {

  constructor(props) {
      super(props);
      this.state = {
        redirect: false,
        photo: null
      }
    }
    componentDidMount(){}


    handleEditProfileClick(id, user) {
      api.updateProfile(id, user).then(profile => {
        console.log('Profile Updated');
        this.props.handleProfileClick(profile);
        this.props.updateProfiles();
      }).catch(function (error) {
        console.log(error);
      })
    }

    onSubmit(e, props) {
      e.preventDefault();
      const id = this.props.user._id
      const user = {
        photo: this.state.photo,
        name: e.target.name.value,
        description: e.target.description.value
      }
      this.handleEditProfileClick(id, user);
      this.setState({redirect: true});
    }

    onDrop(files) {
      this.setState({
        photo: files[0]
      });
    }

    render() {
      const user = this.props.user;
      const { redirect } = this.state;

      if ( redirect ) {
        return <Redirect to={'/'}/>
      }

      return (
        <form className="forms" onSubmit={this.onSubmit.bind(this)}>
          {this.state.photo ?
            <img src={this.state.photo.preview} alt="Smiley face" height="150" /> :
            <DropZone onDrop={this.onDrop.bind(this)}>
              <p className="upload-text" >Update Photo</p>
            </DropZone>
          }
          <br></br>
          <label>
            Update Name:
            <br></br>
            <input type="text" name="name" placeholder={user.name} />
          </label>
          <br></br>
          <label>
            Update Description:
            <br></br>
            <textarea type="text" name="description" placeholder={user.description} />
          </label>
          <br></br>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

export default EditProfile;
