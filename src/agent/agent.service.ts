import {Injectable} from '@nestjs/common';
import { GoogleAuth } from 'google-auth-library';
import {ConversationalSearchServiceClient} from '@google-cloud/discoveryengine/build/src/v1alpha';


@Injectable()
export class AgentService {
	private readonly projectId="277380748256";
	private readonly location="global"; // Options: 'global', 'us', 'eu'
	private readonly collectionId="default_collection"; // Options: 'default_collection'
	private readonly dataStoreId="rosariotesting-datastore4-_1696270521884"; // Create in Cloud Console

	private readonly conversations='-'
	private readonly answerClient: ConversationalSearchServiceClient;

	constructor() {
		const auth = new GoogleAuth({ 
			keyFile: 'auth.json',    
			scopes: 'https://www.googleapis.com/auth/cloud-platform',
		  });
		  console.log(auth)
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
		
		try {
			const response=await this.answerClient.converseConversation(request);
		
			for await (const res of response){
				
				return res}
		} catch(error) {
			console.log(error)
			throw error;
		}
	}  

}

/* import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { GoogleAuth } from 'google-auth-library';

@Injectable() 
export class AgentService {
  constructor(private readonly httpService: HttpService) {}

  async converse(query: string): Promise<any> {
    const url = 'https://discoveryengine.googleapis.com/v1alpha/projects/119496560003/locations/global/collections/default_collection/dataStores/20240809hispanicstarssearchdataupdated_1723246737335/servingConfigs/default_search:search';
    
    const headers = {
      Authorization: `Bearer ${await this.getAccessToken()}`,
      'Content-Type': 'application/json',
    };

    const body = {
      query,
      pageSize: 10,
      queryExpansionSpec: { condition: 'AUTO' },
      spellCorrectionSpec: { mode: 'AUTO' },
      sessionSpec: { searchResultPersistenceCount: 5 },
      session: 'projects/119496560003/locations/global/collections/default_collection/engines/20240809hispanicstardatase_1723246572909/sessions/-',
    };

    const response = this.httpService.post(url, body, { headers });
    return lastValueFrom(response);
  }

  private async getAccessToken(): Promise<string> {
    const auth = new GoogleAuth({ 
		keyFile: 'auth.json',    
		scopes: 'https://www.googleapis.com/auth/cloud-platform',
	  });
  console.log("auth",auth)
	  const client = await auth.getClient();
	  const accessTokenResponse = await client.getAccessToken();
	  console.log('Access Token:', accessTokenResponse.token);
	  if (!accessTokenResponse.token) {
		throw new Error('Unable to retrieve access token');
	  }
  
	  return accessTokenResponse.token;
	}
  
} */


