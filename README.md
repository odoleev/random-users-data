# Random users data table
Table with randomly generated users data and other features.

## Usage example    

**Different data depending on the language you chose. Infinite scroll and data generation.** 
![Usage example](/public/usage-gif-1.gif "Usage example")

**Mistake imitation, seed generation and export current generated data to CSV** 
![Usage example](/public/usage-gif-2.gif "Usage example")

## Features

- Can choose language (en, ru, es). It will lead to UI language change and generating new data (data will match the selected language) .
- Infinite scroll.
- Seeded random and random seed button.
- Data entry mistake imitation (3 types: random switch of two signs, add new sign, delete sign. Also seeded).
- Amount of mistakes can be selected with slider (0 - 10) or input (max 1000).
- Export generated data as CSV file.

# Tech

This app uses following technologies to work properly:

### Frontend:
- React
- Create-react-app
- Redux
- React-csv
- i18next
- Ant design
- Seedrandom

### Try it out 

This app is deployed on **Vercel** (front).
Try it out: <https://random-users-data.vercel.app/>