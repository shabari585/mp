import { Injectable } from '@angular/core';
import { Headers, Http } from "@angular/http";
import 'rxjs/add/operator/map';
import { tokenNotExpired } from "angular2-jwt";


@Injectable()
export class GigService {

    constructor(private http: Http) { }
// update gig
    update_gig(formData){
        return this.http.post("http://localhost:3000/users/update_gig",formData).map(res => res.json());
    }

    // get gigs by id
    get_gigsby_id(user_id){
        return this.http.get("http://localhost:3000/users/get_gigsby_id/" + user_id).map(res => res.json());
    }

    // get gig by gig ID
    get_gig_byId(gig_id){
        return this.http.get("http://localhost:3000/users/get_gig_byId/" + gig_id).map(res => res.json());
    }

    // get all gigs
    get_all_gigs(){
        return this.http.get('http://localhost:3000/users/get_all_gigs/').map(res => res.json());
        // return this.http.get("users/get_all_gigs/").map(res => res.json());
    }

// delete_gig
    delete_gig(gig_id){
        return this.http.get("http://localhost:3000/users/delete_gig/"+gig_id).map(res => res.json());
    }
    
// add to favorites
   add_to_fav(fav){
        let header = new Headers();
        header.append('content-type','application/json');

        return this.http.post("http://localhost:3000/users/add_to_fav", fav , { headers : header}).map(res => res.json());
   }

   get_fav(user_id){
       return this.http.get("http://localhost:3000/users/get_fav/" + user_id).map(res => res.json());
   }
// getting favorite gig
   get_fav_gig(gig_id,user_id){
        return this.http.get("http://localhost:3000/users/get_fav_gig/" + gig_id +'/'+ user_id).map(res => res.json());
   }

//post extras
   post_gig_extrs(ext){
       let header = new Headers();
       header.append('content-type','application/json');
       return this.http.post("http://localhost:3000/users/post_gig_extrs", ext,{ headers : header}).map(res => res.json());
   }
//    update gig extras
   update_gig_extrs(ext){
       let header = new Headers();
       header.append('content-type','application/json');
       console.log(ext);
       return this.http.post("http://localhost:3000/users/update_gig_extrs",ext,{headers:header}).map(res => res.json());
   }
// getting gig extras
   get_gig_extrs(gig_id){

        return this.http.get("http://localhost:3000/users/get_gig_extrs/" + gig_id).map(res => res.json());

   }
// post order details

   post_order_det(formData){
       return this.http.post("http://localhost:3000/users/post_order_det",formData).map(res => res.json());
   }
// get order details(seller)
   get_orders_seller(seller_id){
       return this.http.get("http://localhost:3000/users/get_seller_order_det/" + seller_id).map(res => res.json());
   }
// get order details(buyer)
   get_orders_buyer(buyer_id){
    return this.http.get("http://localhost:3000/users/get_buyer_order_det/" + buyer_id).map(res => res.json());
}

// get order by order_id
    get_orderby_id(order_id){
    return this.http.get("http://localhost:3000/users/get_orderby_id/"+order_id).map(res => res.json());
    }

// get orders by gig_id
    // get_orderby_gigid(gig_id){
    // return this.http.get("http://localhost:3000/users/get_ordersby_gigid/")
    // }
// post review

    post_review(review){
        let header = new Headers();
        header.append('content-type','application/json');
        return this.http.post("http://localhost:3000/users/post_review",review,{headers:header}).map(res => res.json());
    }

    // get reviews
    get_reviews(user_id){
        return this.http.get("http://localhost:3000/users/get_reviews/" + user_id).map(res => res.json());
    }
    // post_notification
    post_notification(new_not){
        let header = new Headers();
        header.append('content-type','application/json');
        return this.http.post("http://localhost:3000/users/post_not",new_not,{headers:header}).map(res => res.json());
    }
    // get notifications by user_id
    get_notifications(user_id){
        return this.http.get("http://localhost:3000/users/get_notby_id/"+user_id).map(res => res.json());
    }
    // change notification status
    change_not_status(not){
        // alert(not_id);
        let header = new Headers();
        header.append('content-type','application/json');
        return this.http.post("http://localhost:3000/users/change_not_status",not,{headers:header}).map(res => res.json());
    }
    // mark all read
    mark_all_read(user_id){
        let header = new Headers();
        header.append('content-type','application/json');
        return this.http.post("http://localhost:3000/users/mark_all_read",user_id,{headers:header}).map(res => res.json());
    }

    // check for conversation
    check_conversation(conv){
        let header = new Headers();
        header.append('content-type','application/json');
        return this.http.post("http://localhost:3000/users/check_conv",conv,{headers:header}).map(res => res.json());
    }
    // send inbox message
    send_message(new_msg){
        let header = new Headers();
        header.append('content-type','application/json');
        return this.http.post("http://localhost:3000/users/send_msg",new_msg,{headers:header}).map(res => res.json());
    }
}