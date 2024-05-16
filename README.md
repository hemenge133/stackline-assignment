# Dashboard Application

This project is a dashboard application built using modern frontend technologies including TypeScript, React, Redux Toolkit, Chart.js, and Material-UI

## Technology Choices

### Chart.js
Chart.js is a powerful and simple-to-use JavaScript library for data visualization. It supports a variety of chart types and is highly customizable.

### Material-UI
Material-UI is a popular React component library that implements Google's Material Design. It provides a wide range of pre-styled components, making it easy to build responsive and visually appealing interfaces.

## Features

### Sort Table by Columns
The table of sales data can be sorted by any column in ascending or descending order.

### Dynamic Layout
The application dynamically adjusts its layout based on the selected view (chart or table) and the selected product. The layout ensures that the selected component (chart or table) takes up the full width and height of the container, providing an optimal viewing experience.

### Zoomable Chart
The sales chart is zoomable and pannable, enabling users to focus on specific time periods or days. This functionality is powered by the `chartjs-plugin-zoom` plugin for Chart.js.

### Chart Tooltips
Any point on the sales chart can be hovered over to view the date, sales type, and more.

### Extended Dataset
To demonstrate the application's capability to handle multiple products, the JSON dataset was extended. This shows how the app dynamically updates its views based on the selected product.

## Future Improvements

### Responsiveness
Although the current layout works well on larger screens, some components need improved responsiveness for smaller screens and especially mobile devices. Future updates will focus on enhancing the responsive design to ensure a seamless user experience across all devices.

### Code Cleanliness
With more time, I could have created more components and refactored a bit to make the dashboard view code more readable. 

### Detailed Product View
Adding a section to view detailed information about products, including reviews, specifications, and other relevant data, would enhance the application's utility. This feature would provide users with comprehensive insights into each product.

### Advanced Time Series Analysis
Incorporating advanced time series analysis tools such as moving averages, percentiles, and other statistical methods would provide deeper insights into sales trends. These tools would allow users to perform more sophisticated analyses directly within the dashboard.
