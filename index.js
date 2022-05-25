const express = require('express')

const mongoose = require('mongoose')
const Pitch = require('./models/pitch')
const Offer = require('./models/offer')
const bodyParser = require('body-parser');


const { render } = require('express/lib/response')

const app = express();

mongoose.connect('mongodb://localhost:27017/xharktank',
  {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  }
);

const port = 8081
app.listen(port, ()=>{
    console.log(`App is listening to the port 8081`)
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// fetching all pitches
app.get('/pitches',async(req,res)=>{
    try{    
        const offers = await Offer.find()
        const pitches = await Pitch.find().sort({createdAt:-1})
        const combinedPitches = pitches.map((p)=>{
            return {
                id:p._id,
                entrepreneur:p.entrepreneur,
                pitchTitle:p.pitchTitle,
                pitchIdea:p.pitchIdea,
                askAmount:p.askAmount,
                equity:p.equity,
                offers:offers.filter((o)=>{ 
                return o.id===p._id.toString()}).map((of)=>{
                    return {
                        id:of._id,
                        investor:of.investor,
                        amount:of.amount,
                        equity:of.equity,
                        comment:of.comment
                    }
                })
            }})

            return res.status(200).send(combinedPitches)

        }
        catch(e){
            return res.status(500).send("INTERNAL SERVER ERROR ")
        }

})

// fetching single pitch
app.get('/pitches/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        // const offer = await Offer.findById(id)
        const pitch = await Pitch.findById(id)
        const offers = await Offer.find()
        // console.log(offers)
        // console.log(pitch)
        const filteredOffers = offers.filter((offer)=>{
            return offer.id.toString()===pitch._id.toString()
        }).map((of)=>{
            return {
                id:pitch._id,
                investor:of.investor,
                amount:of.amount,
                equity:of.equity,
                comment:of.comment
            }
        })
        const returnObject = {
            id:pitch._id,
            entrepreneur:pitch.entrepreneur,
            pitchTitle:pitch.pitchTitle,
            pitchIdea:pitch.pitchIdea,
            askAmount:pitch.askAmount,
            equity:pitch.equity,
            offers:filteredOffers
        }
        return res.status(200).send(returnObject)
    }
    catch(e){
        return res.status(404).send("Not Found")
    }
})

// posting pitch
app.post('/pitches',(req,res)=>{
    // console.log(req.body)
    const pitch = new Pitch(req.body)
    pitch.save()
        .then((result)=>{
            return res.status(201).send({
                id:result.id
            })
        })
        .catch((err)=>{
            console.log(err)
            return res.status(400).send('Invalid Request Body')
        })
})


// offering an offer to pitch
app.post('/pitches/:id/makeOffer',(req,res)=>{
    const id = req.params.id
    // console.log(req.params)
    Pitch.findById(id)
        .then((result)=>{
            const offer = new Offer({...req.body,id:req.params.id})
            offer.save()
                .then((result)=>{
                    return res.status(201).send({
                        id:req.params.id
                    })
                })
                .catch((err)=>{
                    // console.log(err)
                    res.status(400).send('Bad Request')
                })
        })
        .catch((err)=>{
            res.status(404).send('Pitch Not Found')
        })
})

// cr_C2K4Wx2znzqHLLh3t