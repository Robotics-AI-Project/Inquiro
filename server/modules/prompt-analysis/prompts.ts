export const module0Prompt = `Your task is to give a list of refined compound nouns extracted from the user query. Do not give other data apart from the list.

Let's work this out in a step by step way to be sure we have the right answer.

1. Extract compound nouns from the user query as a list, but do not include the word being in single quote('') or double quote(""). A compound noun is a noun that is formed by a combination of more than one part of speech. 
2. Refine each element in the list by removing any quantitative or dimensional adjectives.
3. Give only a list of refined compound nouns as output. No need to provide other data.

#user_query:
"Which cities are in European countries where English is not the official language?"
##output:
["cities","European countries","English","official language"]

#user_query:
What is the content of TV Channel with series name 'Sky Radio' and "Karina"?
##output:
["content","TV Channel", "series"]

#user_query:
"What are 3 most talk-of-the-town episodes in the TV series table and what were those ratings?"
##output:
["talk-of-the-town episodes", "TV series table", "ratings"]

#user_query:
"Who are enrolled in special boosting programs in one semester? List the first name, middle name and last name and the id."
##output:
["special boosting programs", "semester", "first name", "middle name", "last name", "id"]

#user_query:
"Find the names of the visitors who have Serenade membership, and order the results by the level from high to low."
##output:
["names","Serenade membership","visitors","level"]

#user_query:
"List all blank semester name"
##output: 
["blank semester", "name"]`;

export const module05Prompt = `Your task is to remove any superlative adjectives from each element in given list. Do not give other data apart from the list.

Let's work this out in a step by step way to be sure we have the right answer.

1. Utilize the list from \`extracted_word\` as the main list.
2. Superlative adjectives are a form adjectives take when comparing three or more things, such as “tallest student” or “most popular game.”
3. Remove any superlative adjectives from each element in given list. But do not remove compound superlative adjective. Keep other type of adjective.
4. Give only a list as output. No need to provide other data.

#extracted_word:
["high apple","biggest banana","sweetest carrot"]
##output:
["high apple","banana","carrot"]

#extracted_word:
["fast car","faster car", "fastest car"]
##output:
["fast car","faster car", "car"]

#extracted_word:
["first-order cause"]
##output:
["first-order cause"]

#extracted_word:
["big pen","silver lighning tools","copper plant"]
##output:
["big pen","silver lighning tools","copper plant"]`;

export const module1Prompt = `Your task is to generate a list of words that cannot be accurately determined from the given schema. Do not perform other task from this.

Let's work this out in a step by step way to be sure we have the right answer. Don't skip any step.

1. Utilize the list from \`extracted_word\` as the main list.
2. Determine words from Step 1 list if they directly refer to the tables or columns in the provided schema. Ensure that the comparison is case-insensitive and includes both singular and plural forms. Refer to the schema information provided (Table names and Column names).
3. Provide a final list of elements that does not match any table or column name from Step 2. 

#schema:
Table city, columns = ID,Name,CountryCode,District,Population
Table country,columns = Code, Name, Continent, Region, SurfacceArea, IndepYear, Population, LifeExpectancy, GNP, GNPOld, LocalName, GovernmentForm, HeadOfState, Capital, Code2
Table countryLanguage, columns = CountryCode, Language, IsOfficial, Percentage
#extracted_word:
["cities","European countries","English","official language"]
##output:
Step 1: 
["cities","European countries","English","official language"]
Step 2: 
- "cities" refers to the table cities.
- "European countries" refer to column name Continent in table country.
- "English" refers to column name Language in table countryLanguage.
- "official language" refers  to column name Language in table countryLanguage.
Step 3: 
[]

#schema:
Table continents, columns = ContId, Continent
Table countries, columns = CountryId, CountryName, Continent 
foreign_keys = [Continent = continents.ContId]
Table car_makers, columns = Id, Maker, FullName, Country 
foreign_keys = [Country = countries.CountryId]
Table model_list, columns = ModelId, Maker, Model 
foreign_keys = [Maker = car_makers.Id]
Table car_names, columns = MakeId, Model, Make 
foreign_keys = [Model = model_list.Model]
Table cars_data, columns = Id, MPG, Cylinders, Edispl, Horsepower, Weight, Accelerate, Year 
foreign_keys = [Id = car_names.MakeId]
#extracted_word:
["makers", "car models", "full name", "id"]
##output:
Step 1: 
["makers", "car models", "full name", "id"]
Step 2:
- "makers" refers to column name Maker in table car_makers.
- "car models" refers to table model_list and car_makers.
- "full name" refers to column name FullName in table car_makers.
- "id" refers to column name Id in table car_makers and cars_data.
Step 3:
[]

#schema:
Table TV_Channel, columns = id, series_name, Country, Language, Content, Pixel_aspect_ratio_PAR, Hight_definition_TV, Pay_per_view_PPV, Package_Option
Table TV_series, columns = id, Episode, Air_Date, Rating, Share, 18_49_Rating_Share, Viewers_m, Weekly_Rank, Channel 
foreign_keys = [Channel = TV_Channel.id]
Table Cartoon, columns = id, Title, Directed_by, Written_by, Original_air_date, Production_code, Channel 
foreign_keys = [Channel = TV_Channel.id]
#extracted_word: 
["talk-of-the-town episodes", "TV series table", "ratings"]
##output:
Step 1:
["talk-of-the-town episodes", "TV series table", "ratings"]
Step 2:
- "talk-of-the-town episodes" does not match any table or column name.
- "TV series table" refers to table TV_series.
- "ratings" refers to column name 18_49_Rating_Share in table TV_series.
Step 3:
["talk-of-the-town episodes"]

#schema:
Table Conductor, columns = Conductor_ID, Name, Age, Nationality, Year_of_Work
Table Orchestra, columns = Orchestra_ID, Orchestra, Conductor_ID, Record_Company, Year_of_Founded, Major_Record_Format 
foreign_keys = [Conductor_ID = Conductor.Conductor_ID]
Table Performance, columns = Performance_ID, Orchestra_ID, Type, Date, Official_ratings\*(millions),Weekly_rank, Share 
foreign_keys = [Orchestra_ID = Orchestra.Orchestra_ID]
Table Show, columns = Show_ID, Performance_ID, If_first_show, Result, Attendance 
foreign_keys = [Performance_ID = Performance.Performance_ID]
#extracted_word:
["record", "focused companies","names"]
##output:
Step 1:
["record", "focused companies","names"]
Step 2:
- "record" refers to column name Record_Company and Major_Record_Format in table Orchestra.
- "focused companies" does not match any table or column name.
- "names" refers to column name Name in table Conductor.
Step 3:
["focused companies"]`;

export const module2Prompt = `Let's work this out in a step by step way to be sure we have the right answer.

1. Search the definition of each element in \`list_unknown_1\` in \`additionalData\`.
2. The output is in JSON format with two properties:
- "related_data": a string describing the related data which can clarify or give the further definition of the element in \`list_unknown_1\` only from \`additionalData\`. Do not get further data from internet. Always include the data with "->" in related_data.
- "list_unknown_2": a list storing the element from \`list_unknown_1\` that the \`additionalData\`and \`user_feedback_i\` cannot clarify or give any definition.
3. Give output only one JSON output. No need to give other data.

#additionalData:
- the big fish in the ocean means the company that has a market value more than 5 billion dollars.
- liked rate is support rate.
- prime year is year 2023.
- covid pandemic era is the year between 2019 and 2022.
#list_unknown_1:
[]
##output:
{
“related_data”: “”,
“list_unknown_2”:[]
}

#additionalData:
gold honor will be given to the employee who works with the company more than 10 years.
- the big fish in the ocean means the company that has a market value more than 5 billion dollars.
- liked rate is support rate.
- prime year is year 2023.
- covid pandemic era is the year between 2019 and 2022.
#list_unknown_1:
["gold honor"]
##output:
{
“related_data”: “gold honor will be given to the employee who works with the company more than 10 years.”,
“list_unknown_2”: []
}

#additionalData:
a billionaire is a person who has total assets worth more than 1 billion dollars.
- the big fish in the ocean means the company that has a market value more than 5 billion dollars.
- liked rate is support rate.
- prime year is year 2023.
- covid pandemic era is the year between 2019 and 2022.
#list_unknown_1:
["billionaire", "young businessman", "covid pandemic era"]
##output:
{
“related_data”: “covid pandemic era is the year between 2019 and 2022. a billionaire is a person who has total assets worth more than 1 billion dollars.”,
“list_unknown_2”: ["young businessman"]
}

#additionalData:
DBD area -> Greater DBD: Utah or Texas.
- DBD area has 3 major zones: - Greater DBD: Utah or Texas - Business DBD: California - Lower DBD: Wyoming none 
- the big fish in the ocean means the company that has a market value more than 5 billion dollars.
#list_unknown_1:
["DBD area"]
##output:
{
    “related_data”: "DBD area -> Greater DBD: Utah or Texas.",
    “list_unknown_2”: []
}

#additionalData:
rare brush -> large size - 30 mm.
- the big fish in the ocean means the company that has a market value more than 5 billion dollars.
- rare brush has 3 sizes: 1. small size - 10 mm 2. med size 20 mm 3. large size - 30 mm.
#list_unknown_1:
["rare brush"]
##output:
{
“related_data”: “rare brush -> large size - 30 mm.”,
“list_unknown_2”:[]
}`;

export const module3Prompt = `Your task is to determine whether clarified_word has more than one definition from related_data. Then give a list of all definitions derived from related_data.

Let's work this out in a step by step way to be sure we have the right answer.

1. Extract all definitions of clarified_word from related_data.
2. The output is in JSON format with two properties:
- "wordWithOptions": a string describing a word that has more than one definition from related_data. If the word has only one definition from related_data. "wordWithOptions" must be empty.
- "options": a list storing possible defeinitions of a word from related_data. If there is one definition from related_data. "options" must be empty.
3. Give output only one JSON output. No need to give other data.

#clarified_word:
pet club members
#related_data:
Pet club members are students who have a dog but do not have a cat as a pet.
##output:
{
    "wordWithOptions": "",
    "options": []
}

#clarified_word:
approved courses
#related_data:
approved courses -> Small: at most 2 sections
##output:
{
    "wordWithOptions": "",
    "options": []
}

#clarified_word:
emerged stadium
#related_data:
emerged stadium comprises 3 sizes of the stadium.
1. small emerged stadium is a stadium with a capacity between 1000 and 5000.
2. medium emerged stadium is a stadium with a capacity between 5000 and 10000.
3. large emerged stadium is a a stadium with a capacity between 10000 and 50000.
##output:
{
    "wordWithOptions": "emerged stadium",
    "options": ["small emerged stadium is a stadium with a capacity between 1000 and 5000.","medium emerged stadium is a stadium with a capacity between 5000 and 10000.","large emerged stadium is a a stadium with a capacity between 10000 and 50000."]
}

#clarified_word:
A-team
#related_data:
A-team has 2 sub teams:
- Incoming: pilots younger than 30
- Existing: pilots older than 30
##output:
{
    "wordWithOptions": "extraordinary year",
    "options": ["Greater DBD: Utah or Texas","Business DBD: California","Lower DBD: Wyoming"]
}`;
