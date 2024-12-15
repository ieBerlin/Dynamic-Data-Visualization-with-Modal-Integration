<!-- first  -->

we need to show the draged data by the user.
so here we need to create a similar logic to the state where we use a global variable and we use it generally.
so in the intial data we're use the default object provided by the user.
so we need to provide a functions (set & get) that returns the current object which could be modified by any module.
i created two function one called, updateSystemData,getCurrentData, the first to update the current existing data and the other for getting current data.
we notice that the data that it's shown in table is as a xml format, rendered by dmn diagram.
we need to translate the data (draged object data) to xml format:

so what i need is to rendered this data as :

 <rule id="row-495762709-1">
        <inputEntry id="UnaryTests_1nxcsjr">
          <text>"C++"</text>
        </inputEntry>
        <inputEntry id="UnaryTests_1bvh60z">
          <text>&lt; 11</text>
        </inputEntry>
        <inputEntry id="UnaryTests_1r9yorj">
          <text>"Gold"</text>
        </inputEntry>
        <outputEntry id="LiteralExpression_1mtwzqz">
          <text>78000</text>
        </outputEntry>
      </rule>
