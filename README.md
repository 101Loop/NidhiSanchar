


![](https://github.com/101Loop/NidhiSanchar/blob/master/Frontend/src/assets/readmeassets/title.png)


## Contents :

   * [Contents :](#contents-)
   * [Demo :](#demo-)
   * [Overview :](#overview-)
   * [Motivation and Aim](#motivation-and-aim)
   * [Installation :](#installation-)
   * [Features of Nidhi Sanchar :](#features-of-nidhi-sanchar-)
   * [Tech Stack Used :](#tech-stack-used-)



## Demo :

Check the project here in action! :




## Overview :

Due to multiple practical reasons and systematical flaws , the Policies created and managed by the government can not bring out the fullest benifits for the people.
With outdated and inefficient fund management systems and little or very less transparency being the main reasons, any policy created for the people ultimately becomes poorly managed resulting in the loss the trust of the population as well as unutilized resources.

Nidhi Sanchar serves as the one stop solution for the problems mentioned above. This application bridges the mismanagement between central and state government along with the public by providing a web application which estabilishes a portal to be shared by the central and state governments to improve the creation of various Policies as well as management of their funds. The officials also get a discussion page for every policy launched and being processed.

To summarise, the complete lifecycle of a government policy can be seamlessly managed by this system and on the top of it, the officials will get a 24/7 AI powered question answering assistance and chat bot implemented in the application.

![](https://github.com/101Loop/NidhiSanchar/blob/master/Frontend/src/assets/readmeassets/Scheme%20Creation.gif)





## Motivation and Aim

The motivation of this project comes from the issues present at the root of the system responsible for govt. policies implementation, which is 'poor management' that ultimately invites multiple factors like corruption, unequality and scarcity of provisions which were created with the aim to serve all , but eventually reaches few.
With efficient and relialbe technologies, we can improve the out-dated systems which lack in multiple aspects, which are listed below :

- No or very less transparency
- Out dated and inefficient fund request system
- Slow peer to peer connection
- Inefficent monitoring of updates
- Poor discussion panel for officials

The aim of this project is therefore to effectively manage the whole life cycle of a government Policy covering its creation, fund dispersal,status tracking, ground report monitoring, discussion and feedback analysis.



## Installation :

### Steps to setup this project locally

Step 1 : Clone this repo and head over to the directory :   
> ``` $ git clone https://github.com/101Loop/NidhiSanchar.git ```  
> ``` $ cd NidhiSanchar```

Step 2. Install Node Package Manager (NPM)

For Windows :  
 head over to (https://nodejs.org/en/download/)[this] link and follow the standard installation steps.
 
>For Ubuntu/Mac :  
 ```sudo apt install nodejs npm ```

Step 3. Install the required dependencies for the frontend. Head over to the ***Frontend*** directory.  
>``` NishiSanchar $ cd Frontend ```  
Now install the dependencies.  
> ```NishiSanchar/Frontend $ npm install ```
 
 Alright, now lets move on to setting up the backend,  
 
 Step 4. Configure the virtual environment  
 
-  Make sure Python 3.x is already installed. [See here for help](https://www.python.org/downloads/).  
-  Configure the virtual environment.  
-  To know about virtualenv use this link [VirtualEnv](https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/)  

 Step 5. Install the required dependencies for the Backend. Head over to the ***Backend*** directory.  

>```NishiSanchar $ cd Backend```    
>```NishiSanchar/ Backend $ source .venv/bin/activate # activate virtual environment``` (.venv is the name, use any name as you like)  
>```(venv) NishiSanchar/ Backend $  pip install -r requirements.txt```  


 Step 6. Set up the initial migration for our custom user models in users and build the database.  


>```(venv) NishiSanchar/ Backend $ python manage.py migrate```  
>```(venv) NishiSanchar/ Backend $ python manage.py createsuperuser```  


Step 7. Finally, Run the project :  
>```(venv) NishiSanchar/ Backend $ python manage.py runserver```  


- To view API endpoints, go to [Swagger](http://127.0.0.1:8000/swagger/)

- To follow PEP8 code conventions, integrated [Pre-Commit](https://pre-commit.com) which formats code using [Black](https://github.com/psf/black) code formatter.

- To use this run `pre-commit install`, now whenever you commit changes, pre-commit will check the files which you have updated and run some checks.
 
  
 ## Features of Nidhi Sanchar :
 
 Following are the key features of this project :
 
 1. **Landing Page** : A landing page containing Information regarding latest Policies and National Interest.  
 ![landing page](https://github.com/101Loop/NidhiSanchar/blob/master/Frontend/src/assets/readmeassets/landingpage.png)
 2. **Authentication and Authorization** : An intuative login and sign in system with **captcha** check on logging in.  
 ![long in sign up](https://github.com/101Loop/NidhiSanchar/blob/master/Frontend/src/assets/readmeassets/loginauth.png)
 3. **Personalised Dashboard** : A dashbaord page which is customized for each type of user ( state official / central official) to show analytics and reports about policies/schemes which are launched.  
 ![dashboard](https://github.com/101Loop/NidhiSanchar/blob/master/Frontend/src/assets/readmeassets/dashboard.png)
 4. **Scheme Creation and Updation** : A central official can create and modify a scheme through this page.  
 ![create](https://github.com/101Loop/NidhiSanchar/blob/master/Frontend/src/assets/readmeassets/create.png)![update](https://github.com/101Loop/NidhiSanchar/blob/master/Frontend/src/assets/readmeassets/modify.jpg)
 5. **Schemes Lookup page** : A schemes lookup page, containing the currently existing schemes.  
 ![all schemes](https://github.com/101Loop/NidhiSanchar/blob/master/Frontend/src/assets/readmeassets/lookup.png)
 6. **Discussion Page** : A discussion forum page built to discuss over any poilicy.  
 ![discussion](https://github.com/101Loop/NidhiSanchar/blob/master/Frontend/src/assets/readmeassets/discussions.png)
 7. **NLP and Deep Learning Powered Chat assistant** : A Natural Language Processing model build to assist the officials with any task to be done on the dashbaord.  
 ![chatbot](https://github.com/101Loop/NidhiSanchar/blob/master/Frontend/src/assets/readmeassets/chatbot.png)
 8. **Admin Panel** : Django admin panel with localization to multilingual support. 
 ![admin panel](https://github.com/101Loop/NidhiSanchar/blob/master/Frontend/src/assets/readmeassets/adminpanel.png)
 
 
 ## Tech Stack Used : 
 
 
  ![](https://github.com/101Loop/NidhiSanchar/blob/master/Frontend/src/assets/readmeassets/react-js.png)   ![](https://github.com/101Loop/NidhiSanchar/blob/master/Frontend/src/assets/readmeassets/django.png)    ![](https://github.com/101Loop/NidhiSanchar/blob/master/Frontend/src/assets/readmeassets/hf.png)    ![](https://github.com/101Loop/NidhiSanchar/blob/master/Frontend/src/assets/readmeassets/dialogueflow.png)    ![](https://github.com/101Loop/NidhiSanchar/blob/master/Frontend/src/assets/readmeassets/mui.png) 
 
 
 







