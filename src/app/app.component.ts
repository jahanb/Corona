import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { RestService } from './rest.service';
import { ActivatedRoute, Router } from '@angular/router';



export interface PeriodicElement {
   position: number;
   Name: string;
   Population: number;
   Confirmed: number;
   RateOfConfirm: number;
   Deaths: number;
   Rate: number;
   NewConfirm: number;
   NewDeath: number;

}
var ELEMENT_DATA: PeriodicElement[] = [];

var kvArray = [
  {key: 'China' , value:' 1,439,323,776 '},
  {key: 'India' , value:' 1,380,004,385 ' },
  {key: 'US' , value:' 331,002,651'},
  {key: 'Indonesia' , value:' 273,523,615'},
  {key: 'Pakistan' , value:' 220,892,340'},
  {key: 'Brazil' , value:' 212,559,417'},
  {key: 'Nigeria' , value:' 206,139,589'},
  {key: 'Bangladesh' , value:' 164,689,383'},
  {key: 'Russia' , value:' 145,934,462'},
  {key: 'Mexico' , value:' 128,932,753'},
  {key: 'Japan' , value:' 126,476,461'},
  {key: 'Ethiopia' , value:' 114,963,588'},
  {key: 'Philippines' , value:' 109,581,078'},
  {key: 'Egypt' , value:' 102,334,404'},
  {key: 'Vietnam' , value:' 97,338,579 '},
  {key: 'Congo (Kinshasa)' , value:' 89,561,403 '},
  {key: 'Turkey' , value:' 84,339,067 '},
  {key: 'Iran' , value:' 83,992,949 '},
  {key: 'Germany' , value:'83,783,942'},
  {key: 'Thailand' , value:'69,799,978'},
  {key: 'United Kingdom' , value:'67,886,011'},
  {key: 'France' , value:'65,273,511'},
  {key: 'Italy' , value:'60,461,826'},
  {key: 'Tanzania' , value:'59,734,218'},
  {key: 'South Africa' , value:'59,308,690'},
  {key: 'Burma' , value:'54,409,800'},
  {key: 'Kenya' , value:'53,771,296'},
  {key: 'Korea, South' , value:'51,269,185'},
  {key: 'Colombia' , value:'50,882,891'},
  {key: 'Spain' , value:'46,754,778'},
  {key: 'Uganda' , value:'45,741,007'},
  {key: 'Argentina' , value:'45,195,774'},
  {key: 'Algeria' , value:'43,851,044'},
  {key: 'Sudan' , value:'43,849,260'},
  {key: 'Ukraine' , value:'43,733,762'},
  {key: 'Iraq' , value:'40,222,493'},
  {key: 'Afghanistan' , value:'38,928,346'},
  {key: 'Poland' , value:'37,846,611'},
  {key: 'Canada' , value:'37,742,154'},
  {key: 'Morocco' , value:'36,910,560'},
  {key: 'Saudi Arabia' , value:'34,813,871'},
  {key: 'Uzbekistan' , value:'33,469,203'},
  {key: 'Peru' , value:'32,971,854'},
  {key: 'Angola' , value:'32,866,272'},
  {key: 'Malaysia' , value:'32,365,999'},
  {key: 'Mozambique' , value:'31,255,435'},
  {key: 'Ghana' , value:'31,072,940'},
  {key: 'Yemen' , value:'29,825,964'},
  {key: 'Nepal' , value:'29,136,808'},
  {key: 'Venezuela' , value:'28,435,940'},
  {key: 'Madagascar' , value:'27,691,018'},
  {key: 'Cameroon' , value:'26,545,863'},
  {key: 'Cote d\'Ivoire' , value:'26,378,274'},
  {key: 'North Korea' , value:'25,778,816'},
  {key: 'Australia' , value:'25,499,884'},
  {key: 'Niger' , value:'24,206,644'},
  {key: 'Taiwan*' , value:'23,816,775'},
  {key: 'Sri Lanka' , value:'21,413,249'},
  {key: 'Burkina Faso' , value:'20,903,273'},
  {key: 'Mali' , value:'20,250,833'},
  {key: 'Romania' , value:'19,237,691'},
  {key: 'Malawi' , value:'19,129,952'},
  {key: 'Chile' , value:'19,116,201'},
  {key: 'Kazakhstan' , value:'18,776,707'},
  {key: 'Zambia' , value:'18,383,955'},
  {key: 'Guatemala' , value:'17,915,568'},
  {key: 'Ecuador' , value:'17,643,054'},
  {key: 'Syria' , value:'17,500,658'},
  {key: 'Netherlands' , value:'17,134,872'},
  {key: 'Senegal' , value:'16,743,927'},
  {key: 'Cambodia' , value:'16,718,965'},
  {key: 'Chad' , value:'16,425,864'},
  {key: 'Somalia' , value:'15,893,222'},
  {key: 'Zimbabwe' , value:'14,862,924'},
  {key: 'Guinea' , value:'13,132,795'},
  {key: 'Rwanda' , value:'12,952,218'},
  {key: 'Benin' , value:'12,123,200'},
  {key: 'Burundi' , value:'11,890,784'},
  {key: 'Tunisia' , value:'11,818,619'},
  {key: 'Bolivia' , value:'11,673,021'},
  {key: 'Belgium' , value:'11,589,623'},
  {key: 'Haiti' , value:'11,402,528'},
  {key: 'Cuba' , value:'11,326,616'},
  {key: 'South Sudan' , value:'11,193,725'},
  {key: 'Dominican Republic' , value:'10,847,910'},
  {key: 'Czechia' , value:'10,708,981'},
  {key: 'Greece' , value:'10,423,054'},
  {key: 'Jordan' , value:'10,203,134'},
  {key: 'Portugal' , value:'10,196,709'},
  {key: 'Azerbaijan' , value:'10,139,177'},
  {key: 'Sweden' , value:'10,099,265'},
  {key: 'Honduras' , value:'9,904,607 '},
  {key: 'United Arab Emirates' , value:'9,890,402 '},
  {key: 'Hungary' , value:'9,660,351 '},
  {key: 'Tajikistan' , value:'9,537,645 '},
  {key: 'Belarus' , value:'9,449,323 '},
  {key: 'Austria' , value:'9,006,398 '},
  {key: 'Papua New Guinea' , value:'8,947,024 '},
  {key: 'Serbia' , value:'8,737,371 '},
  {key: 'Israel' , value:'8,655,535 '},
  {key: 'Switzerland' , value:'8,654,622 '},
  {key: 'Togo' , value:'8,278,724 '},
  {key: 'Sierra Leone' , value:'7,976,983 '},
  {key: 'Hong Kong' , value:'7,496,981 '},
  {key: 'Laos' , value:'7,275,560 '},
  {key: 'Paraguay' , value:'7,132,538 '},
  {key: 'Bulgaria' , value:'6,948,445 '},
  {key: 'Libya' , value:'6,871,292 '},
  {key: 'Lebanon' , value:'6,825,445 '},
  {key: 'Nicaragua' , value:'6,624,554 '},
  {key: 'Kyrgyzstan' , value:'6,524,195 '},
  {key: 'El Salvador' , value:'6,486,205 '},
  {key: 'Turkmenistan' , value:'6,031,200 '},
  {key: 'Singapore' , value:'5,850,342 '},
  {key: 'Denmark' , value:'5,792,202 '},
  {key: 'Finland' , value:'5,540,720 '},
  {key: 'Congo (Brazzaville)' , value:'5,518,087 '},
  {key: 'Slovakia' , value:'5,459,642 '},
  {key: 'Norway' , value:'5,421,241 '},
  {key: 'Oman' , value:'5,106,626 '},
  {key: 'West Bank and Gaza' , value:'5,101,414 '},
  {key: 'Costa Rica' , value:'5,094,118 '},
  {key: 'Liberia' , value:'5,057,681 '},
  {key: 'Ireland' , value:'4,937,786 '},
  {key: 'Central African Republic' , value:'4,829,767 '},
  {key: 'New Zealand' , value:'4,822,233 '},
  {key: 'Mauritania' , value:'4,649,658 '},
  {key: 'Panama' , value:'4,314,767 '},
  {key: 'Kuwait' , value:'4,270,571 '},
  {key: 'Croatia' , value:'4,105,267 '},
  {key: 'Moldova' , value:'4,033,963 '},
  {key: 'Georgia' , value:'3,989,167 '},
  {key: 'Eritrea' , value:'3,546,421 '},
  {key: 'Uruguay' , value:'3,473,730 '},
  {key: 'Bosnia and Herzegovina' , value:'3,280,819 '},
  {key: 'Mongolia' , value:'3,278,290 '},
  {key: 'Armenia' , value:'2,963,243 '},
  {key: 'Jamaica' , value:'2,961,167 '},
  {key: 'Qatar' , value:'2,881,053 '},
  {key: 'Albania' , value:'2,877,797 '},
  {key: 'Puerto Rico' , value:'2,860,853 '},
  {key: 'Lithuania' , value:'2,722,289 '},
  {key: 'Namibia' , value:'2,540,905 '},
  {key: 'Gambia' , value:'2,416,668 '},
  {key: 'Botswana' , value:'2,351,627 '},
  {key: 'Gabon' , value:'2,225,734 '},
  {key: 'Lesotho' , value:'2,142,249 '},
  {key: 'North Macedonia' , value:'2,083,374 '},
  {key: 'Slovenia' , value:'2,078,938 '},
  {key: 'Guinea-Bissau' , value:'1,968,001 '},
  {key: 'Latvia' , value:'1,886,198 '},
  {key: 'Kosovo' , value:'1,850,000 '},
  {key: 'Bahrain' , value:'1,701,575 '},
  {key: 'Equatorial Guinea' , value:'1,402,985 '},
  {key: 'Trinidad and Tobago' , value:'1,399,488 '},
  {key: 'Estonia' , value:'1,326,535 '},
  {key: 'Timor-Leste' , value:'1,318,445 '},
  {key: 'Mauritius' , value:'1,271,768 '},
  {key: 'Cyprus' , value:'1,207,359 '},
  {key: 'Eswatini' , value:'1,160,164 '},
  {key: 'Djibouti' , value:'988,000 '},
  {key: 'Fiji' , value:'896,445 '},
  {key: 'Réunion' , value:'895,312 '},
  {key: 'Comoros' , value:'869,601 '},
  {key: 'Guyana' , value:'786,552 '},
  {key: 'Bhutan' , value:'771,608 '},
  {key: 'Solomon Islands' , value:'686,884 '},
  {key: 'Macao' , value:'649,335 '},
  {key: 'Montenegro' , value:'628,066 '},
  {key: 'Luxembourg' , value:'625,978 '},
  {key: 'Western Sahara' , value:'597,339 '},
  {key: 'Suriname' , value:'586,632 '},
  {key: 'Cabo Verde' , value:'555,987 '},
  {key: 'Maldives' , value:'540,544 '},
  {key: 'Malta' , value:'441,543 '},
  {key: 'Brunei' , value:'437,479 '},
  {key: 'Guadeloupe' , value:'400,124 '},
  {key: 'Belize' , value:'397,628 '},
  {key: 'Bahamas' , value:'393,244 '},
  {key: 'Martinique' , value:'375,265 '},
  {key: 'Iceland' , value:'341,243 '},
  {key: 'Vanuatu' , value:'307,145 '},
  {key: 'French Guiana' , value:'298,682 '},
  {key: 'Barbados' , value:'287,375 '},
  {key: 'New Caledonia' , value:'285,498 '},
  {key: 'French Polynesia' , value:'280,908 '},
  {key: 'Mayotte' , value:'272,815 '},
  {key: 'Sao Tome & Principe' , value:'219,159 '},
  {key: 'Samoa' , value:'198,414 '},
  {key: 'Saint Lucia' , value:'183,627 '},
  {key: 'Channel Islands' , value:'173,863 '},
  {key: 'Guam' , value:'168,775 '},
  {key: 'Curaçao' , value:'164,093 '},
  {key: 'Kiribati' , value:'119,449 '},
  {key: 'Micronesia' , value:'115,023 '},
  {key: 'Grenada' , value:'112,523 '},
  {key: 'St. Vincent & Grenadines' , value:'110,940 '},
  {key: 'Aruba' , value:'106,766 '},
  {key: 'Tonga' , value:'105,695 '},
  {key: 'U.S. Virgin Islands' , value:'104,425 '},
  {key: 'Seychelles' , value:'98,347'},
  {key: 'Antigua and Barbuda' , value:'97,929'},
  {key: 'Isle of Man' , value:'85,033'},
  {key: 'Andorra' , value:'77,265'},
  {key: 'Dominica' , value:'71,986'},
  {key: 'Cayman Islands' , value:'65,722'},
  {key: 'Bermuda' , value:'62,278'},
  {key: 'Marshall Islands' , value:'59,190'},
  {key: 'Northern Mariana Islands' , value:'57,559'},
  {key: 'Greenland' , value:'56,770'},
  {key: 'American Samoa' , value:'55,191'},
  {key: 'Saint Kitts & Nevis' , value:'53,199'},
  {key: 'Faeroe Islands' , value:'48,863'},
  {key: 'Sint Maarten' , value:'42,876'},
  {key: 'Monaco' , value:'39,242'},
  {key: 'Turks and Caicos' , value:'38,717'},
  {key: 'Saint Martin' , value:'38,666'},
  {key: 'Liechtenstein' , value:'38,128'},
  {key: 'San Marino' , value:'33,931'},
  {key: 'Gibraltar' , value:'33,691'},
  {key: 'British Virgin Islands' , value:'30,231'},
  {key: 'Caribbean Netherlands' , value:'26,223'}];

  var myMap = new Map();

/**
 * @title Table with sorting
 */
@Component({
  selector: 'app-root',
  styleUrls: ['app.component.css'],
  templateUrl: 'app.component.html',
})
export class  AppComponent implements OnInit {
  displayedColumns: string[] = ['rowIndex', 'Name','Population', 'Confirmed','RateOfConfirm','Deaths','Rate','NewConfirm','NewDeath'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  corona:any = [];
  country:any = [];
  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }
  getCorona() {
    this.corona = [];
    this.rest.getCorona().subscribe((data: {}) => {

      this.corona = data;

      let TotalC = 0;
      let TotalD = 0;
      var diffC = 0;
      var diffD = 0 ;
       var num = 0 ;
       var item = 1;

      for (var i in  data ) {
        var popC = 0 ;
        var Population = 0;
       num = parseInt(data[i].length) - 1 ;
      diffC = data[i][num].confirmed -  data[i][num-1].confirmed;
      diffD = data[i][num].deaths - data[i][num-1].deaths ;
       TotalC = (data[i][num].confirmed);
       TotalD = (data[i][num].deaths);
       var Rate = 100*TotalD /TotalC ;
       var RRate = Number( (Rate).toFixed(2) );
         Population = myMap.get(i)	;
        if (Population > 1 ){
       var popC = Math.ceil(100000*TotalC/Population);
        }
       ELEMENT_DATA.push({position: item,Name: i,Population:Population,Confirmed:TotalC,RateOfConfirm:popC,Deaths:TotalD,Rate:RRate,NewConfirm:diffC,NewDeath:diffD},);
  //     console.log( i  +' ' +TotalC + ' ' +TotalD +' ' + RRate + ' '+ diffC+ ' '+ diffD);
       item++;
      };
//https://restcountries.eu/rest/v2/name/aruba?fullText=true
// https://restcountries.eu/rest/v2/alpha/IRN
    });
}

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {

    var reformattedArray = kvArray.map(obj => {
     var pop = obj.value.trim().replace(/,/g, '') ;
      myMap.set(obj.key , pop );
       });

  //  this.getCountry();
    this.getCorona();
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate =
    (data: PeriodicElement, filtersJson: string) => {
        const matchFilter = [];
        const filters = JSON.parse(filtersJson);

        filters.forEach(filter => {
          const val = data[filter.id] === null ? '' : data[filter.id];
          matchFilter.push(val.startsWith(filter.value));
        });
          return matchFilter.every(Boolean);
      };
    }

  applyFilter(filterValue: string) {
    const tableFilters = [];
    tableFilters.push({
      id: 'Name',
      value: filterValue
    });
    this.dataSource.filter = JSON.stringify(tableFilters);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

