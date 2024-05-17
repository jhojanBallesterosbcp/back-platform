import {Injectable} from '@nestjs/common';

import {ConversationalSearchServiceClient} from '@google-cloud/discoveryengine';


@Injectable()
export class AgentService {
	private readonly projectId=process.env.PROJECTID;
	private readonly location=process.env.LOCATION; // Options: 'global', 'us', 'eu'
	private readonly collectionId=process.env.COLLECTIONID; // Options: 'default_collection'
	private readonly dataStoreId=process.env.DATASTOREID; // Create in Cloud Console

	private readonly conversations='-'
	private readonly answerClient: ConversationalSearchServiceClient;

	constructor() {
		const apiEndpoint=
			this.location==="global"
				? 'discoveryengine.googleapis.com'
				:`${this.location}-discoveryengine.googleapis.com`;

		this.answerClient=new ConversationalSearchServiceClient({apiEndpoint: apiEndpoint})
	}
	
	async converse(query: string) {
		const name=this.answerClient.projectLocationCollectionDataStoreConversationPath(
			this.projectId,
			this.location,
			this.collectionId,
			this.dataStoreId,
			this.conversations,
		)

	
		const request={
			query: {
				input: query
			},
			summarySpec: {
				summaryResultCount: 5,
				ignoreAdversarialQuery: true,
				includeCitations: true,
			}, 
			name,
		} 

		console.log(name)
		try {
			const response=await this.answerClient.converseConversation(request);
			
			console.log(response)
			for await (const res of response){
				
				return res}
		} catch(error) {
			console.log(error)
			throw error;
		}
	}  

}


