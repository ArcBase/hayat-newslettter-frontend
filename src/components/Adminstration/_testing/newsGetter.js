// Banking and Stories
const Banking = 'Banking'
const BankingKeywords = [
    'Stock Market Nigeria' , 'First Bank of Nigeria' ,'Foreign Exchange Nigeria' , 'Central Bank of Nigeria' ,
]

// Business Financials
const BusinessAndFinanacials = 'Business Nigeria'
const BusinessAndFinanacialsKeyword = [
    'Industry Nigeria' ,'Insurance Nigeria' ,'Stock Market' ,'Regulators Nigeria' ,
]
 
// Econmy Keywords
const Economy = 'Economy'
const EconomyKeywords = [
    'Real Estate Nigeria' ,'Agriculture Nigeria' ,'Mininng Nigeria' ,'Oil and Gas Nigeria' ,
]

//Politics and General News

const Politics = 'Politics Nigeria'
const PoliticsKeyword = [
    'APC Nigeria' ,'PDP Nigeria' ,'Buhari Nigeria','General News Nigeria',
]

//General News Nigeira
const General = 'Nigeria'
const GeneralNewsKeywords = [
    'Nigeria'
]


//this Function Updates and Gets latest news from the internet
const UpdateContents = async()=>{

    // Politics
    for ( let i = 0 ; i<PoliticsKeyword.length ; i++){
        const newsEndpoint = host + `/api/get_latest_News/${Politics}/${PoliticsKeyword[i]}`
        await axios.get(newsEndpoint)
       
    }

    // Banking Headlines
    for ( let i = 0 ; i<BankingKeywords.length ; i++){
        const newsEndpoint = host + `/api/get_latest_News/${Banking}/${BankingKeywords[i]}`
        await axios.get(newsEndpoint)
       
    }

    // Business and Finance
    for ( let i = 0 ; i<BusinessAndFinanacialsKeyword.length ; i++){
        const newsEndpoint = host + `/api/get_latest_News/${BusinessAndFinanacials}/${BusinessAndFinanacialsKeyword[i]}`
        await axios.get(newsEndpoint)
       
    }

    // Economy Nigeria
    for ( let i = 0 ; i<EconomyKeywords.length ; i++){
        const newsEndpoint = host + `/api/get_latest_News/${Economy}/${EconomyKeywords[i]}`
        await axios.get(newsEndpoint)
       
    }

     // General News
     for ( let i = 0 ; i<GeneralNewsKeywords.length ; i++){
        const newsEndpoint = host + `/api/get_latest_News/${General}/${GeneralNewsKeywords[i]}`
        await axios.get(newsEndpoint)
       
    }

}
    //

