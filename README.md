# Belly Button Biodiversity

## Overview
Utilize JavaScript, Plotly library, and HTML to create a data dashboard with interactive charts and table. 

### Objectives
- Create a dashboard site to display data and interactive charts
- Allow the user to select a volunteer ID in the dropdown menu
- According to the selected ID, display a table to show demographics information
- Display a bar chart to list the top 10 bacteria in quantity
- Display a bubble chart to illustrate all bacteria ID and their quantity in bubble size

### Resources
*Data*
- [Sample data in JSON format](https://github.com/jjin92/Belly_button_biodiversity/blob/master/samples.json)

*Software*
- JavaScript, d3.js, Plotly.js, HTML, Bootstrap, CSS

## Solution and Steps
*1. HTML*
- Make sure to link to the Bootstrap and CSS stylesheet
- Use jombotron to create a title with background
- Create a dropdown menu with id `selDataset`. This will take in the select value and trigger the `optionChanged` function upon any changes.
- Create a placeholder table with id `sample-metadata` which will display demographics info upon change in dropdown menu
- Create a placeholder for a bar chart with id `bar`
- Create a placeholder for a bubble chart with id `bubble`

*2. JavaScript*
- Create function `init` that reads in the volunteer IDs in the json data file. Then use d3 to append the dropdown menu to the `selDataset` in HTML
- Create the `optionChanged` function that takes in one argument of volunteer ID, which is passed through the dropdown menu. This function also triggers three more functions which will be explained below: `buildMetadata`, `buildBarChart`, and `buildBubbleChart`
- In function `buildMetadata`, read in the json data file and filter the objects using the volunteer ID passed in as argument. Output each key:value pair into the `sample-metadata` placeholder using d3.js
- In function `buildBarChart`, reads in the json data and filter using volunteer ID. Append otu_ids, sample_values and otu_lables into an array. Sort sample_values descending and slice the top 10. Create a horizontal bar chart.
- In function `buildBubbleChart`, reads in the json data and filter using volunteer ID. Use sample_values as yaxis and bubble size; use otu_id as xaxis and color value; use otu_label as the hovertext
- At the end of the code, call the `init` function, and pass ID 940 to the `optionChanged` function to display the inital content when the page is loaded

## Preview
- The interactive website can be accessed [here](https://jjin92.github.io/Belly_button_biodiversity/)
- Below is a preview of how the page looks like.

![page_preview](https://github.com/jjin92/Belly_button_biodiversity/blob/master/preview.png)