import React, { Component } from 'react'
import AWS from 'aws-sdk'
import { CognitoUserPool } from 'amazon-cognito-identity-js'
import 'amazon-cognito-js'

const setupAws = new Promise(function(resolve, reject) {
  // AWS.config.setPromisesDependency(Promise)
  AWS.config.region = process.env.REACT_APP_AWS_REGION
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: process.env.REACT_APP_AWS_COGNITO_IDENTITY_POOL_ID
  })
  resolve()
});

const lambda = setupAws.then(() => (
  new Promise((resolve, reject) => {
    resolve(new AWS.Lambda())
  })
))

const cognitoSync = setupAws.then(() => (
  new Promise((resolve, reject) => {
    AWS.config.credentials.get(() => {
      resolve(new AWS.CognitoSyncManager())
    })
  })
))

const userPool = setupAws.then(() => (
  new Promise((resolve, reject) => {
    resolve(new CognitoUserPool({
      UserPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID,
      ClientId: process.env.REACT_APP_AWS_COGNITO_CLIENT_ID
    }))
  })
))

const injectAws = (WrappedComponent) => (
  class extends Component {
    render() {
      return (
        <WrappedComponent
          {...this.props}
          lambda={lambda}
          cognitoSync={cognitoSync}
          userPool={userPool}
        />
      )
    }
  }
)

export default injectAws
