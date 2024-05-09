import { Injectable } from '@angular/core';
import { UserDetails } from 'src/objects/user-details';

@Injectable()

export class UserContextService {

  userDetails: UserDetails = new UserDetails;

  public setUserDetails(userDetails : UserDetails){
    this.userDetails = userDetails;
    console.log("set user ud email: "+this.userDetails.email);
  }

  public getUserDetails() : UserDetails{
    console.log("Retuning ud with email: "+this.userDetails.email)
    return this.userDetails;
  }
}
