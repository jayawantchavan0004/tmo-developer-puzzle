
Short code review of the base `master` branch:

1. What is done well?
  - Used NGRX for state management at Angular side, So it is simplifying the application state for plain objects, enforcing unidirectional data
    flow, and more. The Ngrx/Effects library used is allowing the application to communicate with the other layer by triggering side effects. Like we can give call from Ngrx/Effects to other layer like hapi and we can fetch the data from hapi API.
  - hapi is written in stock-api folder to build various reusable services. It enables developers to 
    focus on writing reusable application logic instead of spending time building infrastructure.
  - Reactive form used to fetch the data from user so We can listen to form changes or events easily
    using reactive forms.   
  - Data is shared betweedn component using decorator like @Output. Best practices being were used.

2. What would you change?
   - Fixed Test case failing issue for for different component(app, stock, chart).
   - Hold subscription call in temporary variable and unsubscribed it using ng Destroy life cycle hook to release memory in the system.
     So that memory leakage has been handled.
   - Created constants to hold the hard code string date of various time durations & Interface to hold the chart Information.
   - Corrected ngIf condition to load chart based on stock data.
   - Added Token to get success response from backend API.

3. Are there any code smells or problematic implementations?
    - Data was not coming from backend API call as API Token was missig in environment.ts
    - Chart was not loading because of inavlid If condition in chart.component.ts 
    - Beacuse of absence of unsubscribe() call, therw was memory leakage at various places.
    