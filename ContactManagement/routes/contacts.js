
/*
 * GET users listing.
 */

exports.list = function(req, res){

  req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM contact',function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('contacts',{page_title:"Contacts Management",data:rows});
                
           
         });
         
         //console.log(query.sql);
    });
  
};

exports.search = function(req, res){

      var input = JSON.parse(JSON.stringify(req.body));

      var keyword = input.search.toLowerCase();

      //console.log("keyword"+keyword);

  req.getConnection(function(err,connection){
      
       var keywordList = keyword.split(" ");
       var len = keywordList.length;
       var values = [];
       console.log("yamini len"+len);
       for(var i=0;i<4;i++){
           //var temp=[];
           for(var j=0;j<len;j++){
            var t = [];
            t.push("%"+keywordList[j]+"%")
            values.push(t);
           }
           //values.push(temp);
       }
       
       var where1 = '';
       var where2 = '';
       var where3 = '';
       var where4 = '';
       var searchString = [];
       searchString.push('LOWER(CONCAT(Fname," ",Mname," ",Lname))');
       searchString.push('LOWER(CONCAT(Address_type," ",Address," ",City," ",State," ",Zip))');
       searchString.push('LOWER(CONCAT(Date_type," ",Date))');
       searchString.push('LOWER(CONCAT(Phone_type," ",Area_code," ",Number))');

       for(var i=0;i<len-1;i++){
        where1 = where1 + ' ? OR ' + searchString[0] + " LIKE ";
       }

       where1 = where1 + '?';

       for(var i=0;i<len-1;i++){
        where2 = where2 + ' ? OR ' + searchString[1] + " LIKE ";
       }

       where2 = where2 + '?' + ' )';

       for(var i=0;i<len-1;i++){
        where3 = where3 + ' ? OR ' + searchString[2] + " LIKE ";
       }

       where3 = where3 + '?' + ' )';

       for(var i=0;i<len-1;i++){
        where4 = where4 + ' ? OR ' + searchString[3] + " LIKE ";
       }

       where4 = where4 + '?' + ' )';

       var sql = 'SELECT * FROM contact WHERE LOWER(CONCAT(Fname," ",Mname," ",Lname)) LIKE '+where1+ ' UNION SELECT * FROM contact as c WHERE EXISTS ( SELECT * FROM address as a WHERE c.Contact_id = a.Contact_id AND ( LOWER(CONCAT(Address_type," ",Address," ",City," ",State," ",Zip)) LIKE '+ where2 +' ) UNION SELECT * FROM contact as c1 WHERE EXISTS ( SELECT * FROM date as d WHERE c1.Contact_id = d.Contact_id AND ( LOWER(CONCAT(Date_type," ",Date)) LIKE '+ where3 +' ) UNION SELECT * FROM contact as c2 WHERE EXISTS ( SELECT * FROM phone as p WHERE c2.Contact_id = p.Contact_id AND ( LOWER(CONCAT(Phone_type," ",Area_code," ",Number)) LIKE '+ where4 +' )';

       //console.log(sql);

       var query = connection.query(sql,values,function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );

            //console.log("rows length"+rows.length);
     
            res.render('contacts',{page_title:"Contacts Management",data:rows});
                
           
         });

       console.log(query.sql);
         
    });
  
};

exports.add = function(req, res){
  res.render('add_contact',{page_title:"Add Contact"});
};


exports.edit = function(req, res){
    
    var id = req.params.id;
    
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM contact WHERE Contact_id = ?',[id],function(err,rows)
        {
            var Contactdetails = {};
            
            if(err)
                console.log("Error Selecting : %s ",err );

            Contactdetails.primary = rows;
            
            connection.query('SELECT * FROM address WHERE Contact_id = ?',[id],function(err1,rows1){
             
              if(err1)
                console.log("Error Selecting : %s ",err1 );

              
               Contactdetails.addressList = rows1;

            connection.query('SELECT * FROM date WHERE Contact_id = ?',[id],function(err2,rows2){
             
              if(err2)
                console.log("Error Selecting : %s ",err2);
              
                Contactdetails.dateList = rows2;

            connection.query('SELECT * FROM phone WHERE Contact_id = ?',[id],function(err3,rows3){
             
              if(err3)
                console.log("Error Selecting : %s ",err3);
              
               Contactdetails.phoneList = rows3;
            
            res.render('edit_contact',{page_title:"Edit Contact",data:Contactdetails});
            });

            });
                
            });
         });
         
    }); 
};

/*Save the contact*/
exports.save = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {
        
        var data = {
            
            Fname : input.Fname,
            Mname : input.Mname,
            Lname : input.Lname 
        
        };
        
        var query = connection.query("INSERT INTO contact set ? ",data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
            console.log("res1 id:"+rows.insertId);
            console.log("number of addresses:"+ input.lengthOfAddresses);

              if(rows.insertId != null || rows.insertId != undefined){
                var temp = input.lengthOfAddresses+"";
                var ele = temp.split(",");
                
                //insert address list
                 if(input.lengthOfAddresses != undefined) {
                    var sql = "INSERT INTO address (Address_type, Address, City, State, Zip, Contact_id) VALUES ?";
                    var values = [];
                    for(var i in ele){
                        console.log("index-->"+ele[i]);
                        values.push([input["AddressType"+ele[i]],input["Address"+ele[i]],input["City"+ele[i]],input["State"+ele[i]],input["Zip"+ele[i]],rows.insertId]);
                     }
                    connection.query(sql, [values], function (err, result) {
                      if (err) throw err;
                        console.log(" Number of addresses inserted: " + result.affectedRows);
                   });
                  }
                //insert phone numbers list
                if(input.lengthOfNumbers != undefined) {
                    var sql = "INSERT INTO phone (Phone_type, Area_code, Number, Contact_id) VALUES ?";
                    var values = [];
                     var temp = input.lengthOfNumbers+"";
                     console.log("lengthOfNumbers-->"+temp);
                     var elements = temp.split(",");
                     
                    for(var i in elements) {
                        values.push([input["NumberType"+elements[i]],input["AreaCode"+elements[i]],input["Number"+elements[i]],rows.insertId]);
                     }
                    connection.query(sql, [values], function (err, result) {
                      if (err) throw err;
                        console.log(" Number of phone numbers inserted: " + result.affectedRows);
                   });
                  }

                  if(input.lengthOfDates  != undefined){
                     var sql = "INSERT INTO date (Date_type, Date,Contact_id) VALUES ?";
                    var values = [];
                     var temp = input.lengthOfDates+"";
                     console.log("lengthOfDates-->"+temp);
                     var ele1 = temp.split(",");
                    for(var i in ele1) {
                        values.push([input["DateType"+ele1[i]],input["Date"+ele1[i]],rows.insertId]);
                     }
                    connection.query(sql, [values], function (err, result) {
                      if (err) throw err;
                        console.log(" Number of Date records inserted: " + result.affectedRows);
                   });
                  }
                }else{
                  console.log("insert of contact failed");
                }
          res.redirect('/contacts');
          
        });
        
       // console.log(query.sql); get raw query
    
    });
};

exports.save_edit = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));

    var id = req.params.id;
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
            Fname : input.Fname,
            Mname : input.Mname,
            Lname : input.Lname 
        
        };
        
        connection.query("UPDATE contact set ? WHERE Contact_id = ? ",[data,id], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );

              console.log("number of addresses:"+ input.lengthOfAddresses1);

                //update address list
                var len = parseInt(input.lengthOfAddresses1);
                 if(len>0) {
                    //var sql = "UPDATE address set ? WHERE Address_id = ?";
                    var sql = "UPDATE address set Address_type =? , Address =? , City =? , State=? , Zip=? WHERE Address_id = ?";
                    var values = [];
                    for (var i = 0; i < len; i++) {
                      //Address_id,Address_type, Address, City, State, Zip, Contact_id
                        values = [];
                        values.push([input["AddressType"+i]],[input["Address"+i]],[input["City"+i]],[input["State"+i]],[input["Zip"+i]],[input["Address_id"+i]]);
                         connection.query(sql,values, function (err, result) {
                                if (err) throw err;
                        //console.log(" Number of addresses inserted: " + result.affectedRows);
                        });
                     }
                      
                  }
                //insert phone numbers list
                var lenphonenumber = parseInt(input.lengthOfNumbers1);
                console.log("lenphonenumber"+lenphonenumber);
                if(lenphonenumber>0) {
                    var sql = "UPDATE phone set Phone_type =?, Area_code =?, Number=? WHERE Phone_id = ?";
                    for (var i = 0; i < lenphonenumber; i++) {
                        var values = [];
                        values.push([input["NumberType"+i]],[input["AreaCode"+i]],[input["Number"+i]],[input["Phone_id"+i]]);
                        console.log("numbertype"+input["NumberType"+i]+"areacode"+input["AreaCode"+i] + "number" + input["Number"+i] + "phoneid" + input["Phone_id"+i]);
                        connection.query(sql, values, function (err, result) {
                      if (err) throw err;
                        //console.log(" Number of phone numbers inserted: " + result.affectedRows);
                       });
                     }
                    
                  }

                  var lendates = parseInt(input.lengthOfDates1);
                  console.log("lendates"+lendates);
                  if(lendates>0){
                     var sql = "UPDATE date set Date_type =?, Date =? WHERE Date_id= ?";
                     var len = lendates;
                    for (var i = 0; i < len; i++) {
                        var values = [];
                        values.push([input["DateType"+i]],[input["Date"+i]],[input["Date_id"+i]]);
                        connection.query(sql, values, function (err, result) {
                      if (err) throw err;
                        //console.log(" Number of Date records inserted: " + result.affectedRows);
                        });
                     }
                    
                  }

                   //insert address list
                  var temp = input.lengthOfAddresses+"";
                  var ele = temp.split(",");
                 if(input.lengthOfAddresses != undefined) {
                    var sql = "INSERT INTO address (Address_type, Address, City, State, Zip, Contact_id) VALUES ?";
                    var values = [];
                    for(var i in ele){
                        console.log("index-->"+ele[i]);
                        values.push([input["AddressType"+ele[i]],input["Address"+ele[i]],input["City"+ele[i]],input["State"+ele[i]],input["Zip"+ele[i]],id]);
                     }
                    connection.query(sql, [values], function (err, result) {
                      if (err) throw err;
                        console.log(" Number of addresses inserted: " + result.affectedRows);
                   });
                  }
                //insert phone numbers list
                if(input.lengthOfNumbers != undefined) {
                    var sql = "INSERT INTO phone (Phone_type, Area_code, Number, Contact_id) VALUES ?";
                    var values = [];
                     var temp = input.lengthOfNumbers+"";
                     console.log("lengthOfNumbers-->"+temp);
                     var elements = temp.split(",");
                     
                    for(var i in elements) {
                        values.push([input["NumberType"+elements[i]],input["AreaCode"+elements[i]],input["Number"+elements[i]],id]);
                     }
                    connection.query(sql, [values], function (err, result) {
                      if (err) throw err;
                        console.log(" Number of phone numbers inserted: " + result.affectedRows);
                   });
                  }

                  if(input.lengthOfDates  != undefined){
                     var sql = "INSERT INTO date (Date_type, Date,Contact_id) VALUES ?";
                    var values = [];
                     var temp = input.lengthOfDates+"";
                     console.log("lengthOfDates-->"+temp);
                     var ele1 = temp.split(",");
                    for(var i in ele1) {
                        values.push([input["DateType"+ele1[i]],input["Date"+ele1[i]],id]);
                     }
                    connection.query(sql, [values], function (err, result) {
                      if (err) throw err;
                        console.log(" Number of Date records inserted: " + result.affectedRows);
                   });
                  }
         
          res.redirect('/contacts');
          
        });
    
    });
};


exports.delete_contact = function(req,res){
          
     var id = req.params.id;
    
     req.getConnection(function (err, connection) {
        
        connection.query("DELETE FROM contact  WHERE Contact_id = ? ",[id], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('/contacts');
             
        });
        
     });
};

exports.delete_phone = function(req,res){
          
     var id = req.params.id;
    
     req.getConnection(function (err, connection) {

        var contactid;

        connection.query("SELECT * FROM phone  WHERE Phone_id = ? ",[id], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
             contactid = rows[0].Contact_id;
             console.log("phone contact id"+rows[0].Contact_id);
             
        });
        
        connection.query("DELETE FROM phone  WHERE Phone_id = ? ",[id], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('/contacts/edit/'+ contactid);
             
        });
        
     });
};

exports.delete_date = function(req,res){
          
     var id = req.params.id;

     var contactid;
    
     req.getConnection(function (err, connection) {

         connection.query("SELECT * FROM date  WHERE Date_id = ? ",[id], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
             contactid = rows[0].Contact_id;
             console.log("date contact id"+rows[0].Contact_id);
             
        });
        
        connection.query("DELETE FROM date  WHERE Date_id = ? ",[id], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('/contacts/edit/'+ contactid);
             
        });
        
     });
};

exports.delete_address = function(req,res){
          
     var id = req.params.id;

      var contactid;

    
     req.getConnection(function (err, connection) {

         connection.query("SELECT * FROM address  WHERE Address_id = ? ",[id], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
             contactid = rows[0].Contact_id;
             console.log("address contact id"+rows[0].Contact_id);
             
        });
        
        connection.query("DELETE FROM address  WHERE Address_id = ? ",[id], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('/contacts/edit/'+ contactid);
             
        });
        
     });
};


