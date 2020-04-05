import React, { Component } from 'react'
import MarketList from "./MarketList"
import BuyTulip from './BuyTulip';
import CloseRequest from './CloseRequest';
import { Button } from 'semantic-ui-react';


class MarketHome extends Component 
{
    constructor(props){
        super(props);
        this.state = {
        closeReqIDs : [],
        // buyReqIDs : [],
        isOpen:false,
        // IsOpenBuy: false,
        myTulipsForSale:[],
        // myTulipsForBuying:[],
        tulipID:[],
        // buyTulipID:[],
        tulipInfo:[],
        // buyTulipInfo:[],        
        totalTulip:[],
        // totalTulipBuy:[],
        }
        
        this.getTulip = this.getTulip.bind(this)
        this.showInfo= this.showInfo.bind(this)
        this.tulipsForSale = this.tulipsForSale.bind(this)
        this.getClosingRequestIds = this.getClosingRequestIds.bind(this)
        // this.getBuyingRequestIds = this.getBuyingRequestIds.bind(this)

    }

    componentDidMount() {
         this.intervaltwo = setInterval(() => this.showInfo(),1000)
         //  this.interval = setInterval(() =>  this.showBuyingInfo() , 1000);

        }

    componentWillUnmount() {
      clearInterval(this.intervaltwo);
      
    //   clearInterval(this.interval);
    }
    

    async getClosingRequestIds(){
      console.log(this.props.userAccount)
      var closeReqIDs = await this.props.worldOfTulips.methods.getAllOwnedOpenRequestIDs(this.props.userAccount).call({from: this.props.userAccount});
      this.setState({closeReqIDs:closeReqIDs});
      
      console.log(this.state.closeReqIDs)
     
    }

    //this funcition gives ID, price and deadline of the card  


      async tulipsForSale() {
    //   console.log("tulipsForSale")    
      await this.getClosingRequestIds();
      
      var myTulipsForSale = await Promise.all(this.state.closeReqIDs.map(id => this.props.worldOfTulips.methods.getRequest(id).call({from:this.props.userAccount})))
        this.setState({myTulipsForSale:myTulipsForSale})
        // console.log(this.state.myTulipsForSale)
    }

        async showInfo(){

        await this.tulipsForSale();

        var tulipID = await Promise.all(this.state.myTulipsForSale.map((tulip) => { return tulip.tulipID}));
        
        this.setState({tulipID:tulipID})
        // console.log(this.state.tulipID)

        var tulipInfo = await Promise.all(this.state.tulipID.map((id) =>  this.props.worldOfTulips.methods.getTulip(id).call({from:this.props.userAccount})))   
        this.setState({tulipInfo:tulipInfo})

        // console.log(this.state.tulipInfo)
        
        let reqIdArray = this.state.closeReqIDs
        let tulipInfoArray = this.state.tulipInfo
        let myTulipsForSalearray = this.state.myTulipsForSale
        let length = myTulipsForSalearray.length
        // var totalTulip =  myTulipsForSalearray.concat(reqIdArray).concat(tulipInfoArray)
        // to make object Array
 
        var i;
        for (i =0; i< length ; i++ ) {
            // Object.assign(myTulipsForSalearray[i],reqIdArray[i])
            myTulipsForSalearray[i].reqId = reqIdArray[i]
            myTulipsForSalearray[i].generation = tulipInfoArray[i].generation
            myTulipsForSalearray[i].motherID = tulipInfoArray[i].motherID
            myTulipsForSalearray[i].nextReproductionBlock = tulipInfoArray[i].nextReproductionBlock
            myTulipsForSalearray[i].owner = tulipInfoArray[i].owner
            myTulipsForSalearray[i].plantingTime = tulipInfoArray[i].plantingTime
            myTulipsForSalearray[i].stage = tulipInfoArray[i].stage
            myTulipsForSalearray[i].R = tulipInfoArray[i].R
            myTulipsForSalearray[i].G = tulipInfoArray[i].G
            myTulipsForSalearray[i].B = tulipInfoArray[i].B  

        }   
        



        console.log(myTulipsForSalearray)
        this.setState({totalTulip:myTulipsForSalearray})
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                      
    //                                              /////       BuyTulip Section       ///


    //     async getBuyingRequestIds(){

    //     var buyReqIDs = await this.props.worldOfTulips.methods.getOthersOpenRequestIDs(this.props.userAccount).call({from:this.props.userAccount});
    //     this.setState({buyReqIDs:buyReqIDs});
    //     console.log(buyReqIDs)
    // }

    // // this funcition gives ID, price and deadline of the card  


    //     async tulipsForBuying() {
    //     await this.getBuyingRequestIds();
        
    //     var myTulipsForBuying = await Promise.all(this.state.buyReqIDs.map(id => this.props.worldOfTulips.methods.getRequest(id).call()))
    //     this.setState({myTulipsForBuying:myTulipsForBuying})
    //     console.log(this.state.myTulipsForBuying)
    // }

    //     async showBuyingInfo(){

    //     await this.tulipsForBuying();

    //     var buyTulipID = await Promise.all(this.state.myTulipsForBuying.map((tulip) => { return tulip.tulipID}));
        
    //     this.setState({buyTulipID:buyTulipID})
    //     console.log(this.state.buyTulipID)

    //     var buyTulipInfo = await Promise.all(this.state.buyTulipID.map((id) =>  this.props.worldOfTulips.methods.getTulip(id).call()))   
    //     this.setState({buyTulipInfo:buyTulipInfo})

    //     console.log(this.state.buyTulipInfo)
        
    //     let buyReqIdArray = this.state.buyReqIDs
    //     let buyTulipInfoArray = this.state.buyTulipInfo
    //     let myTulipsForBuyingarray = this.state.myTulipsForBuying
    //     let length = myTulipsForBuyingarray.length
      
    //     var i;
    //     for (i =0; i< length ; i++ ) {
    //         // Object.assign(myTulipsForSalearray[i],reqIdArray[i])
    //         myTulipsForBuyingarray[i].reqId = buyReqIdArray[i]
    //         myTulipsForBuyingarray[i].generation = buyTulipInfoArray[i].generation
    //         myTulipsForBuyingarray[i].motherID = buyTulipInfoArray[i].motherID
    //         myTulipsForBuyingarray[i].nextReproductionBlock = buyTulipInfoArray[i].nextReproductionBlock
    //         myTulipsForBuyingarray[i].owner = buyTulipInfoArray[i].owner
    //         myTulipsForBuyingarray[i].plantingTime = buyTulipInfoArray[i].plantingTime
    //         myTulipsForBuyingarray[i].stage = buyTulipInfoArray[i].stage
    //         myTulipsForBuyingarray[i].R = buyTulipInfoArray[i].R
    //         myTulipsForBuyingarray[i].G = buyTulipInfoArray[i].G
    //         myTulipsForBuyingarray[i].B = buyTulipInfoArray[i].B  

    //     }   
        



    //     console.log(myTulipsForBuyingarray)
    //     this.setState({totalTulipBuy:myTulipsForBuyingarray})
    // }




    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async getTulip(id){
     
     var tulip = await this.props.worldOfTulips.methods.getTulip(id).call()
     return tulip
    }

    render() {

        return <div>
            <p> Sell Your Tulips
            </p>
            <p>Tulips for Sale: {JSON.stringify(this.state.totalTulipBuy)} </p>
            <MarketList {...this.props}/>
            {/* <BuyTulip {...this.props} totalTulipBuy = {this.state.totalTulipBuy}/> */}
            <CloseRequest { ...this.props} totalTulip = {this.state.totalTulip}
                
            
            />
        </div>
    }
}

export default MarketHome;

