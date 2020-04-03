import React, { Component } from 'react'
import MarketList from "./MarketList"
// import BuyTulip from './BuyTulip';
import CloseRequest from './CloseRequest';


class MarketHome extends Component 
{
    constructor(props){
        super(props);
        this.state = {
        closeReqIDs : [],
        isOpen:false,
        myTulipsForSale:[],
        tulipID:[],
        tulipInfo:[],
        totalTulip:[]
        }
        
        this.getTulip = this.getTulip.bind(this)
        this.showInfo()

    }

    componentDidMount() {
     this.interval = setInterval(() =>  this.showInfo() , 1000);
    }

    componentWillUnmount() {
      clearInterval(this.interval);
    }
    

    async getClosingRequestIds(){
      console.log(this.props.userAccount)
      var closeReqIDs = await this.props.worldOfTulips.methods.getAllOwnedOpenRequestIDs(this.props.userAccount).call({from:this.props.userAccount});
      this.setState({closeReqIDs:closeReqIDs});
      
      console.log(this.state.closeReqIDs)
     
    }



    //this funcition gives ID, price and deadline of the card  


      async tulipsForSale() {
      await this.getClosingRequestIds();
      
      var myTulipsForSale = await Promise.all(this.state.closeReqIDs.map(id => this.props.worldOfTulips.methods.getRequest(id).call({from:this.props.userAccount})))
        this.setState({myTulipsForSale:myTulipsForSale})
        console.log(this.state.myTulipsForSale)
    }

        async showInfo(){

        await this.tulipsForSale();

        var tulipID = await Promise.all(this.state.myTulipsForSale.map((tulip) => { return tulip.tulipID}));
        
        this.setState({tulipID:tulipID})
        console.log(this.state.tulipID)

        var tulipInfo = await Promise.all(this.state.tulipID.map((id) =>  this.props.worldOfTulips.methods.getTulip(id).call({from:this.props.userAccount})))   
        this.setState({tulipInfo:tulipInfo})

        console.log(this.state.tulipInfo)
        
        let reqIdArray = this.state.closeReqIDs
        let tulipInfoArray = this.state.tulipInfo
        let myTulipsForSalearray = this.state.myTulipsForSale
        let length = myTulipsForSalearray.length
        // var totalTulip =  myTulipsForSalearray.concat(reqIdArray).concat(tulipInfoArray)
        // to make object Array
 
        var totalTulip = []
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
     /////       BuyTulip Section       ///
                                                //       async getBuyingReqIds(){

                                                //       var closeReqIDs = await this.props.worldOfTulips.methods.getOthersOpenRequestIDs(this.props.userAccount).call();
                                                //       this.setState({closeReqIDs:closeReqIDs});
                                                //       console.log(closeReqIDs)
                                                //     }



                                                //     //this funcition gives ID, price and deadline of the card  


                                                //       async tulipsForSale() {
                                                //       await this.getClosingRequestIds();
                                                        
                                                //       var myTulipsForSale = await Promise.all(this.state.closeReqIDs.map(id => this.props.worldOfTulips.methods.getRequest(id).call()))
                                                // //       myTulipsForSale.then((myTulipsForSale) => {this.setState({myTulipsForSale:myTulipsForSale})})
                                                // //       myTulipsForSale.then((myTulipsForSale)=> {console.log(myTulipsForSale)})
                                                // //       myTulipsForSale.then((myTulipsForSale) => { return this.setState({tulipID : myTulipsForSale.tulipID})})
                                                // //       myTulipsForSale.then(()=>{return console.log(this.state.myTulipsForSale)})
                                                // // //  .then((tulip) => {this.setState({tulipID:tulip.tulipID})})
                                                //         this.setState({myTulipsForSale:myTulipsForSale})
                                                //         console.log(this.state.myTulipsForSale)
                                                //     }

                                                //        async showInfo(){

                                                //         await this.tulipsForSale();

                                                //         var tulipID = await Promise.all(this.state.myTulipsForSale.map((tulip) => { return tulip.tulipID}));
                                                        
                                                //         this.setState({tulipID:tulipID})
                                                //         console.log(this.state.tulipID)

                                                //         var tulipInfo = await Promise.all(this.state.tulipID.map((id) =>  this.props.worldOfTulips.methods.getTulip(id).call()))   
                                                //         this.setState({tulipInfo:tulipInfo})

                                                //         console.log(this.state.tulipInfo)
                                                        
                                                //         let reqIdArray = this.state.closeReqIDs
                                                //         let tulipInfoArray = this.state.tulipInfo
                                                //         let myTulipsForSalearray = this.state.myTulipsForSale
                                                //         let length = myTulipsForSalearray.length
                                                //         // var totalTulip =  myTulipsForSalearray.concat(reqIdArray).concat(tulipInfoArray)
                                                //         // to make object Array
                                                
                                                //         var totalTulip = []
                                                //         var i;
                                                //         for (i =0; i< length ; i++ ) {
                                                //             // Object.assign(myTulipsForSalearray[i],reqIdArray[i])
                                                //             myTulipsForSalearray[i].reqId = reqIdArray[i]
                                                //             myTulipsForSalearray[i].generation = tulipInfoArray[i].generation
                                                //             myTulipsForSalearray[i].motherID = tulipInfoArray[i].motherID
                                                //             myTulipsForSalearray[i].nextReproductionBlock = tulipInfoArray[i].nextReproductionBlock
                                                //             myTulipsForSalearray[i].owner = tulipInfoArray[i].owner
                                                //             myTulipsForSalearray[i].plantingTime = tulipInfoArray[i].plantingTime
                                                //             myTulipsForSalearray[i].stage = tulipInfoArray[i].stage
                                                //             myTulipsForSalearray[i].R = tulipInfoArray[i].R
                                                //             myTulipsForSalearray[i].G = tulipInfoArray[i].G
                                                //             myTulipsForSalearray[i].B = tulipInfoArray[i].B  

                                                //         }   
                                                        



                                                //         console.log(myTulipsForSalearray)
                                                //         this.setState({totalTulip:myTulipsForSalearray})
                                                //     }




    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async getTulip(id){
     
     var tulip = await this.props.worldOfTulips.methods.getTulip(id).call()
     return tulip
    }

    render() {

        return <div>
            <p> Sell Your Tulips
            </p>
            <p>Tulips for Sale: {JSON.stringify(this.state.totalTulip)} </p>
            <MarketList {...this.props}/>
            {/* <BuyTulip {...this.props}/> */}
            <CloseRequest { ...this.props} totalTulip = {this.state.totalTulip}
                
            
            />
        </div>
    }
}

export default MarketHome;

