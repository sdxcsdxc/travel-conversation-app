const appData = {
    reservations: [
        { 
            id: 'bus-6017', 
            name: '🚌 신림역 공항버스 (6017번) 탑승', 
            date: '2026-03-07', 
            time: '05:00 ~ 05:10 (권장)', 
            type: 'transport', 
            addr: '신림역 8번 출구 정류장',
            map: 'http://www.airportlimousine.co.kr/',
            recommendations: ['🔗 공식 시간표: http://www.airportlimousine.co.kr/', '운행간격: 20~30분', '인천공항 T1까지 약 1시간 30분 소요', '요금: 17,000원', '공항 2시간 전 도착(06:40)을 위한 첫차급 시간대입니다.']
        },
        { 
            id: 'flight-dep', 
            name: '✈️ 후쿠오카 출행 (인천 T1 -> 후쿠오카 T1)', 
            date: '2026-03-07', 
            time: '08:40 ~ 10:20', 
            type: 'flight', 
            addr: '인천국제공항 제1여객터미널',
            map: 'https://www.google.com/maps/search/?api=1&query=Incheon+Airport+Terminal+1' 
        },
        { 
            id: 'flight-ret', 
            name: '✈️ 인천 귀국 (후쿠오카 T1 -> 인천 T1)', 
            date: '2026-03-11', 
            time: '15:20 ~ 16:30', 
            type: 'flight', 
            addr: '후쿠오카공항 국제선 터미널',
            map: 'https://www.google.com/maps/search/?api=1&query=Fukuoka+Airport+International+Terminal' 
        },
        { 
            id: 'res-lunch-07', 
            name: '🍣 스시 사카바 사시스 (원후쿠오카 빌딩점)', 
            date: '2026-03-07', 
            time: '13:00 (예상)', 
            type: 'food', 
            addr: 'Fukuoka, Chuo Ward, Tenjin, 1 Chome−11−1 One Fukuoka Building B1 (Tenjin Norengai)',
            map: 'https://www.google.com/maps/search/?api=1&query=Sushi+Sakaba+Sashisu+One+Fukuoka+Building',
            recommendations: ['🔥 참치 뱃살 김말이 (토로타쿠)', '🦐 호화 스시 모듬', '유후인 이동 전 든든한 점심 추천']
        },
        { 
            id: 'res-01', 
            name: '후쿠오카 야끼니꾸 니쿠마루', 
            date: '2026-03-07', 
            time: '18:00', 
            type: 'food', 
            addr: 'Fukuoka, Chuo Ward, Watanabedori, 5 Chome−1−26',
            map: 'https://www.google.com/maps/search/?api=1&query=Yakiniku+Nikumaru+Fukuoka',
            recommendations: ['🔥 특선 야끼니꾸 모둠', '🥩 우설 소금구이', '🍲 호르몬(내장) 전골']
        },
        { 
            id: 'res-02', 
            name: '친자 타키비야 (Chinza Takibiya)', 
            date: '2026-03-08', 
            time: '18:20', 
            type: 'food', 
            addr: 'Fukuoka, Chuo Ward, Imaizumi, 2 Chome-4-32',
            map: 'https://www.google.com/maps/search/?api=1&query=Chinza+Takibiya+Fukuoka',
            recommendations: ['🐟 가다랑어 짚불구이 (Warayaki)', '🍣 고등어 봉초밥', '🍚 이쿠라 미니 덮밥', '🐄 와규 숯불구이']
        },
        { 
            id: 'res-tetsuya', 
            name: 'YAKINIKU TETSUYA', 
            date: '2026-03-09', 
            time: '19:30', 
            type: 'food', 
            addr: 'Fukuoka, Chuo Ward, Haruyoshi, 3 Chome−12−1 1F',
            map: 'https://www.google.com/maps/search/?api=1&query=Yakiniku+Tetsuya+Fukuoka',
            recommendations: ['🔥 테츠야 코스', '🐮 설로인 야키샤부', '규탕 (우설) 추천']
        },
        { 
            id: 'res-bike-01', 
            name: '이토시마 전기자전거 렌탈', 
            date: '2026-03-09', 
            time: '11:30 (도착 예정)', 
            type: 'transport', 
            addr: '2186-1 Shimanogita, Itoshima, Fukuoka 819-1303 Japan',
            map: 'https://www.google.com/maps/search/?api=1&query=2186-1+Shimanogita+Itoshima+Fukuoka' 
        },
        { 
            id: 'bus-ten-yuf', 
            name: '🚍 고속버스 (텐진 -> 유후인)', 
            date: '2026-03-10', 
            time: '10:55 ~ 13:17', 
            type: 'transport', 
            addr: '텐진 고속버스터미널',
            map: 'https://www.google.com/maps/search/?api=1&query=Tenjin+Express+Bus+Terminal',
            ticket: 'https://www.highwaybus.com/gp/payment/payWebTicketFromMail?b470c93d93635635156b8d412e9480c3&ticket_type=mobile',
            recommendations: ['터미널 3층에서 탑승', '유후인 에키마에 버스센터 도착', '🔗 모바일 티켓 확인 필수']
        },
        { 
            id: 'bus-yuf-fuk', 
            name: '🚍 고속버스 (유후인 -> 후쿠오카 공항)', 
            date: '2026-03-11', 
            time: '12:30 ~ 14:15', 
            type: 'transport', 
            addr: '유후인 버스센터',
            map: 'https://www.google.com/maps/search/?api=1&query=Yufuin+Station+Bus+Center',
            ticket: 'https://www.highwaybus.com/gp/payment/payWebTicketFromMail?afa962d30d1a20a1bacb88eca0eabdfd&ticket_type=mobile',
            recommendations: ['유후인역 옆 버스센터 탑승', '후쿠오카공항 국제선 터미널 하차', '🔗 모바일 티켓 확인 필수']
        },
        { 
            id: 'res-hotel-tenjin', 
            name: '🏨 퀸테사 호텔 후쿠오카 텐진 (3박)', 
            date: '2026-03-07', 
            time: '15:00 (Check-in)', 
            type: 'stay', 
            addr: '3 Chome-2-10 Tenjin, Chuo Ward, Fukuoka, 810-0001 Japan',
            map: 'https://www.google.com/maps/search/?api=1&query=Quintessa+Hotel+Fukuoka+Tenjin+Comic+Books',
            recommendations: ['텐진역 도보 5분', '체크아웃: 3월 10일 오전']
        },
        { 
            id: 'res-hotel-01', 
            name: '유후노 오야도 호타루 (료칸)', 
            date: '2026-03-10', 
            time: '15:00 (Check-in)', 
            type: 'stay', 
            addr: '〒879-5114 Oita, Yufu, 湯布院町川北１７９１−1 Japan',
            map: 'https://www.google.com/maps/search/?api=1&query=Yufuno+Oyado+Hotaru',
            recommendations: ['체크아웃: 3월 11일 오전', '천연 온천 이용 가능']
        }
    ],
    categories: [
        { id: 'basic', name: '👋 기본/인사', icon: '👋' },
        { id: 'guide', name: '🗺️ 여행 가이드', icon: '🗺️' }, /* New */
        { id: 'yatai', name: '🍜 텐진/야타이', icon: '🍜' }, /* New */
        { id: 'ryokan', name: '♨️ 유후인/료칸', icon: '♨️' }, /* New */
        { id: 'airport', name: '✈️ 공항/기내', icon: '✈️' },
        { id: 'transport', name: '🚆 길찾기/교통', icon: '🚆' },
        { id: 'hotel', name: '🏨 숙소/호텔', icon: '🏨' },
        { id: 'dining', name: '🍽️ 식당/카페', icon: '🍽️' },
        { id: 'shopping', name: '🛍️ 쇼핑/편의점', icon: '🛍️' },
        { id: 'emergency', name: '🚨 비상/약국', icon: '🚨' }
    ],
    /* New Section: Travel Guides */
    guides: [
        {
            area: '후쿠오카 시내 (Fukuoka City)',
            spots: [
                { name: '니쿠노야마쇼', desc: '야키니쿠 (4.6)', type: 'food', map: 'https://www.google.com/maps/search/?api=1&query=니쿠노야마쇼+Fukuoka' },
                { name: '스미요시 슈한', desc: '주류 판매점 (4.5)', type: 'shopping', map: 'https://www.google.com/maps/search/?api=1&query=Sumiyoshi+Shuhan+Fukuoka' },
                { name: '로디아르', desc: '패스트리/디저트 (4.5)', type: 'cafe', map: 'https://www.google.com/maps/search/?api=1&query=L’odeur+Fukuoka' },
                { name: 'OYATUYA.U의 킷사', desc: '카페 (4.5)', type: 'cafe', map: 'https://www.google.com/maps/search/?api=1&query=OYATUYA.U+Fukuoka' },
                { name: 'Hysteric Glamour', desc: '의류점 (3.1)', type: 'shopping', map: 'https://www.google.com/maps/search/?api=1&query=Hysteric+Glamour+Fukuoka' },
                { name: 'SCHOOL BUS의헌옷가게', desc: '중고 의류 (5.0)', type: 'shopping', map: 'https://www.google.com/maps/search/?api=1&query=SCHOOL+BUS+Fukuoka' },
                { name: 'THALIA COFFEE ROASTERS', desc: '로스터리 카페 (4.3)', type: 'cafe', map: 'https://www.google.com/maps/search/?api=1&query=THALIA+COFFEE+ROASTERS' },
                { name: 'dacō (다코)', desc: '카페/빵 (3.8)', type: 'cafe', map: 'https://www.google.com/maps/search/?api=1&query=daco+Fukuoka' },
                { name: '아임도넛', desc: '도넛 맛집 (3.7)', type: 'cafe', map: 'https://www.google.com/maps/search/?api=1&query=I\'m+donut+Fukuoka' },
                { name: '쁘띠 주르', desc: '케이크 전문점 (4.2)', type: 'cafe', map: 'https://www.google.com/maps/search/?api=1&query=Petit+Jour+Fukuoka' },
                { name: 'SOMEWARE', desc: '생활용품점 (3.3)', type: 'shopping', map: 'https://www.google.com/maps/search/?api=1&query=SOMEWARE+Fukuoka' },
                { name: '텐텐테이', desc: '이자카야 (4.4)', type: 'food', map: 'https://www.google.com/maps/search/?api=1&query=Tententei+Fukuoka' },
                { name: 'YAKINIKU TETSUYA', desc: '야키니쿠 (4.7)', type: 'food', map: 'https://www.google.com/maps/search/?api=1&query=Yakiniku+Tetsuya+Fukuoka' },
                { name: '호르몬 타케다 다이묘', desc: '곱창구이 (4.5)', type: 'food', map: 'https://www.google.com/maps/search/?api=1&query=Yakiniku+Horumon+Takeda+Daimyo' },
                { name: '야키니쿠 바쿠로 하카타', desc: '야키니쿠 (4.4)', type: 'food', map: 'https://www.google.com/maps/search/?api=1&query=Yakiniku+Bakuro+Hakata' },
                { name: '이치란 캐널시티', desc: '라멘 (4.1)', type: 'food', map: 'https://www.google.com/maps/search/?api=1&query=Ichiran+Canal+City' },
                { name: '이치란 본사 총본점', desc: '라멘 (4.2)', type: 'food', map: 'https://www.google.com/maps/search/?api=1&query=Ichiran+Headquarters' },
                { name: '토리돈 하루요시', desc: '이자카야 (4.0)', type: 'food', map: 'https://www.google.com/maps/search/?api=1&query=Toridon+Haruyoshi' },
                { name: '이자카야 스카이', desc: '일식 (4.1)', type: 'food', map: 'https://www.google.com/maps/search/?api=1&query=Izakaya+Sky+Fukuoka' },
                { name: '스투시 (Stussy)', desc: '의류점 (3.6)', type: 'shopping', map: 'https://www.google.com/maps/search/?api=1&query=Stussy+Fukuoka' },
                { name: '베이프 (BAPE)', desc: '의류점 (3.3)', type: 'shopping', map: 'https://www.google.com/maps/search/?api=1&query=BAPE+STORE+Fukuoka' },
                { name: '친자 타키비야', desc: '일식 (4.4)', type: 'food', map: 'https://www.google.com/maps/search/?api=1&query=Chinza+Takibiya' },
                { name: '이토오카시', desc: '일식 (4.4)', type: 'food', map: 'https://www.google.com/maps/search/?api=1&query=Itookashi+Fukuoka' },
                { name: '효탄 스시', desc: '초밥 (4.2)', type: 'food', map: 'https://www.google.com/maps/search/?api=1&query=Hyotan+Sushi' },
                { name: '야키니쿠 밧텐', desc: '야키니쿠 (4.4)', type: 'food', map: 'https://www.google.com/maps/search/?api=1&query=Yakiniku+Batten' },
                { name: 'PRINCE of the FRUIT', desc: '과일/카페 (4.1)', type: 'cafe', map: 'https://www.google.com/maps/search/?api=1&query=PRINCE+of+the+FRUIT' },
                { name: '우오덴', desc: '해산물/명란덮밥 (4.2)', type: 'food', map: 'https://www.google.com/maps/search/?api=1&query=Uoden+Fukuoka' },
                { name: 'Boulanger Kaiti', desc: '제과점 (4.1)', type: 'cafe', map: 'https://www.google.com/maps/search/?api=1&query=Boulanger+Kaiti' },
                { name: 'Arima', desc: '야키토리 (4.6)', type: 'food', map: 'https://www.google.com/maps/search/?api=1&query=Arima+Yakitori+Fukuoka' },
                { name: '쓰리 비 포터즈', desc: '생활용품/도자기 (4.1)', type: 'shopping', map: 'https://www.google.com/maps/search/?api=1&query=BBB+POTTERS' },
                { name: '야키토리 코토', desc: '고급 야키토리 (4.7)', type: 'food', map: 'https://www.google.com/maps/search/?api=1&query=Yakitori+Koto' },
                { name: '오니기리 고리짱', desc: '주먹밥 (4.9)', type: 'food', map: 'https://www.google.com/maps/search/?api=1&query=Onigiri+Gorichan+Fukuoka' },
                { name: 'Bshop', desc: '의류점', type: 'shopping', map: 'https://www.google.com/maps/search/?api=1&query=Bshop+Fukuoka' },
                { name: 'FREAK\'S STORE', desc: '의류점', type: 'shopping', map: 'https://www.google.com/maps/search/?api=1&query=FREAK\'S+STORE+Fukuoka' },
                { name: 'DANTON', desc: '의류점', type: 'shopping', map: 'https://www.google.com/maps/search/?api=1&query=DANTON+Fukuoka' },
                { name: '아크테릭스', desc: '아웃도어', type: 'shopping', map: 'https://www.google.com/maps/search/?api=1&query=Arc\'teryx+Fukuoka' },
                { name: 'Diesel', desc: '의류점 (4.7)', type: 'shopping', map: 'https://www.google.com/maps/search/?api=1&query=Diesel+Fukuoka' },
                { name: '몽벨', desc: '아웃도어 (4.0)', type: 'shopping', map: 'https://www.google.com/maps/search/?api=1&query=Montbell+Fukuoka' },
                { name: '키디랜드', desc: '장난감/캐릭터 (4.1)', type: 'shopping', map: 'https://www.google.com/maps/search/?api=1&query=Kiddy+Land+Fukuoka' },
                { name: '슈프림', desc: '의류점 (3.2)', type: 'shopping', map: 'https://www.google.com/maps/search/?api=1&query=Supreme+Fukuoka' },
                { name: '하카타 고마사바야', desc: '고등어회/해산물 (4.4)', type: 'food', map: 'https://www.google.com/maps/search/?api=1&query=Hakata+Gomasabaya' },
                { name: '차노마', desc: '카페/식사 (4.6)', type: 'cafe', map: 'https://www.google.com/maps/search/?api=1&query=Chanoma+Fukuoka' },
                { name: '돈카츠 요시다', desc: '돈까스 (4.5)', type: 'food', map: 'https://www.google.com/maps/search/?api=1&query=Tonkatsu+Yoshida' },
                { name: '마구로토 고항 쿠로다한', desc: '해산물 덮밥 (4.9)', type: 'food', map: 'https://www.google.com/maps/search/?api=1&query=Maguro+to+Gohan+Kurodahan' },
                { name: '로바타 카미나리바시', desc: '로바타야키 (4.4)', type: 'food', map: 'https://www.google.com/maps/search/?api=1&query=Robata+Kaminaribashi' },
                { name: '히키니쿠토코메', desc: '함바그 (4.4)', type: 'food', map: 'https://www.google.com/maps/search/?api=1&query=Hikiniku+to+Kome+Fukuoka' },
                { name: '토이치 (Toichi)', desc: '돼지 스테이크 (4.1)', type: 'food', map: 'https://www.google.com/maps/search/?api=1&query=Buta+Steak+Toichi' },
                { name: '우나기 욘다이메 키쿠가와', desc: '장어 (4.6)', type: 'food', map: 'https://www.google.com/maps/search/?api=1&query=Unagi+Yondaime+Kikukawa+Fukuoka' },
                { name: '모츠나베 오오이시', desc: '곱창전골 (4.4)', type: 'food', map: 'https://www.google.com/maps/search/?api=1&query=Motsunabe+Oishi' },
                { name: '야키토리 쵸우자', desc: '야키토리 (3.7)', type: 'food', map: 'https://www.google.com/maps/search/?api=1&query=Yakitori+Chouza' },
                { name: '무사시자', desc: '이자카야 (4.2)', type: 'food', map: 'https://www.google.com/maps/search/?api=1&query=Sumigekijo+Musashiza' },
                { name: '멘야잇시', desc: '라멘 (4.2)', type: 'food', map: 'https://www.google.com/maps/search/?api=1&query=Menya+Isshi' },
                { name: '야끼소룡포 텐텐', desc: '만두 (4.1)', type: 'food', map: 'https://www.google.com/maps/search/?api=1&query=Yakisoryompo+Tentent' },
                { name: '풀풀 베이커리', desc: '명란바게트 (4.5)', type: 'cafe', map: 'https://www.google.com/maps/search/?api=1&query=Full+Full+Bakery+Fukuoka' },
                { name: '우나기진', desc: '장어 (4.3)', type: 'food', map: 'https://www.google.com/maps/search/?api=1&query=Unagijin+Fukuoka' },
                { name: '하카타 잇소우', desc: '라멘 (4.0)', type: 'food', map: 'https://www.google.com/maps/search/?api=1&query=Hakata+Issou' },
                { name: '잇푸도 라멘', desc: '라멘 (4.2)', type: 'food', map: 'https://www.google.com/maps/search/?api=1&query=Ippudo+Daimyo' },
                { name: '모츠나베 라쿠텐치', desc: '곱창전골 (4.7)', type: 'food', map: 'https://www.google.com/maps/search/?api=1&query=Motsunabe+Rakutenchi' },
                { name: '키와미야 함바그', desc: '함바그 (3.9)', type: 'food', map: 'https://www.google.com/maps/search/?api=1&query=Kiwamiya+Fukuoka' },
                { name: '요코마사', desc: '우설 (4.8)', type: 'food', map: 'https://www.google.com/maps/search/?api=1&query=Yokomasa+Fukuoka' },
                { name: '니쿠토사케 주베', desc: '야키니쿠 (4.8)', type: 'food', map: 'https://www.google.com/maps/search/?api=1&query=Niku+to+Sake+Jubei' },
                { name: '케고 야키톤', desc: '돼지구이 (3.9)', type: 'food', map: 'https://www.google.com/maps/search/?api=1&query=Kego+Yakiton' },
                { name: '우나기노 에이토', desc: '장어 (4.9)', type: 'food', map: 'https://www.google.com/maps/search/?api=1&query=Unagino+Eito' },
                { name: '스시사카바 사시스', desc: '스시 이자카야 (4.4)', type: 'food', map: 'https://www.google.com/maps/search/?api=1&query=Sushi+Sakaba+Sashisu' },
                { name: 'BOUL\'ANGE', desc: '크루아상 (4.5)', type: 'cafe', map: 'https://www.google.com/maps/search/?api=1&query=BOUL\'ANGE+Fukuoka' },
                { name: '빵 스톡 (Pain Stock)', desc: '명란바게트 (4.2)', type: 'cafe', map: 'https://www.google.com/maps/search/?api=1&query=Pain+Stock+Tenjin' },
                { name: '아맘 다코탄', desc: '베이커리 (4.0)', type: 'cafe', map: 'https://www.google.com/maps/search/?api=1&query=Amam+Dacotan' },
                { name: '무츠카도', desc: '식빵 카페 (4.2)', type: 'cafe', map: 'https://www.google.com/maps/search/?api=1&query=Mutsukado+Cafe' },
                { name: '다코멧카', desc: '베이커리 (4.0)', type: 'cafe', map: 'https://www.google.com/maps/search/?api=1&query=Dacomecca' }
            ]
        },
        {
            area: '유후인 & 근교 (Suburbs)',
            spots: [
                { name: '하카타 버스터미널 (3층)', desc: '유후인행 버스 타는 곳 (3F 34번 게이트). [예약 필수] ✅ 실측정보', type: 'transport', map: 'https://www.google.com/maps/search/?api=1&query=Hakata+Bus+Terminal' },
                { name: '유후인 버스센터', desc: '하차 장소 & 돌아가는 버스 매표소 (유후인역 바로 옆)', type: 'transport', map: 'https://www.google.com/maps/search/?api=1&query=Yufuin+Station+Bus+Center' },
                { name: '산큐패스/버스 예약 (Web)', desc: '하이웨이 버스 예약 사이트 (Link)', type: 'transport', map: 'https://www.highwaybus.com/gp/foreign/index' },
                { name: '킨린코 호수', desc: '유후인 명소', type: 'sight', map: 'https://www.google.com/maps/search/?api=1&query=Kinrinko+Lake' },
                { name: 'Palm Beach', desc: '이토시마 해변 카페 (4.7)', type: 'cafe', map: 'https://www.google.com/maps/search/?api=1&query=Palm+Beach+Itoshima' },
                { name: '후타미가우라 해안', desc: '부부바위, 흰 도리이 (4.4)', type: 'sight', map: 'https://www.google.com/maps/search/?api=1&query=Futamigaura' },
                { name: '이토시마 noodle lab', desc: '이토시마 라멘 (4.5)', type: 'food', map: 'https://www.google.com/maps/search/?api=1&query=Itoshima+noodle+lab' },
                { name: '런던버스 카페', desc: '이토시마 포토존 (4.2)', type: 'cafe', map: 'https://www.google.com/maps/search/?api=1&query=London+Bus+Cafe+Itoshima' },
                { name: '유후노 오야도 호타루', desc: '료칸 (4.5)', type: 'sight', map: 'https://www.google.com/maps/search/?api=1&query=Yufuno+Oyado+Hotaru' }
            ]
        },
        {
            area: '🚌 텐진 → 이토시마 버스 (West Coast Liner) ✅ 검증됨',
            spots: [
                { name: '📍 텐진 4초메/3초메 (승차)', desc: '[미나텐진] 앞 4초메 또는 [노스텐진] 앞 3초메 정류장에서 탑승. [웨스트코스트 라이너/이토시마호] 확인!', type: 'transport', map: 'https://www.google.com/maps/search/?api=1&query=Tenjin+4-chome+Bus+Stop' },
                { name: '🚲 자전거 대여소/탈리아 커피 (노기타)', desc: '[시마노기타(野北, Nogita)] 정류장 하차. 자전거 대여소와 인기가 많은 [탈리아 커피] 카페가 정류장 바로 앞입니다.', type: 'transport', map: 'https://www.google.com/maps/search/?api=1&query=THALIA+COFFEE+ROASTERS+Itoshima' },
                { name: '⏰ 운행 시간표 Tip', desc: '평일/주말 운행 시간이 다르니 반드시 전날 <a href="https://showa-bus.jp/" target="_blank">공식홈</a> 체크 권장. (1시간 간격)', type: 'info' },
                { name: '💱 요금 및 패스', desc: '현금 1,150엔. 산큐패스 가능. [마이루트] 앱의 이토시마 프리패스(1,800엔)가 가장 이득!', type: 'info' },
                { name: '🌊 주요 관광지 하차', desc: '후타미가우라(부부바위) 또는 팜비치 카페 등도 이 노선으로 바로 이동 가능.', type: 'sight', map: 'https://www.google.com/maps/search/?api=1&query=Futamigaura+Itoshima' }
            ]
        },
        {
            area: '💳 IC 교통카드 완전 정복 (IC Card Manual)',
            spots: [
                { name: '1. 구매하기 (Purchase)', desc: '지하철역 노란색 발매기에서 [IC Card] 또는 [하야카켄] 버튼 클릭. 보증금 500엔 포함 (나중 반납 시 환불) <a href="https://subway.city.fukuoka.lg.jp/hayakaken/" target="_blank" style="color:var(--primary-color); text-decoration:underline;">[하야카켄 공식]</a>', type: 'transport' },
                { name: '2. 충전하기 (Recharge)', desc: '역내 정산기 또는 세븐일레븐/패밀리마트 계산대에서 가능. "차지 오네가이시마스"라고 말하고 금액 지불', type: 'transport' },
                { name: '3. 사용하기 (How to Use)', desc: '지하철 개찰구 또는 버스 승차/하차 시 단말기에 [띡!] 소리가 날 때까지 터치. (잔액 부족 시 기사님께 정산 가능)', type: 'transport' },
                { name: '4. 종류 안내 (Types)', desc: '후쿠오카는 하야카켄/니모카/스고카가 주력이나, Suica/Icoca 등 기존 카드도 호환 사용 가능', type: 'info' },
                { name: '💡 꿀팁', desc: '아이폰 유저는 지갑 앱에서 파스모/스이카를 즉시 발급 및 현대카드로 충전 가능!', type: 'info' }
            ]
        }
    ],
    phrases: {
        basic: [
            { ko: '안녕하세요 (아침)', en: 'Good morning', pr_en: '굿 모닝', jp: 'おはようございます', pr_jp: '오하요- 고자이마스' },
            { ko: '안녕하세요 (점심)', en: 'Hello', pr_en: '헬로', jp: 'こんにちは', pr_jp: '곤니찌와' },
            { ko: '안녕하세요 (저녁)', en: 'Good evening', pr_en: '굿 이브닝', jp: 'こんばんは', pr_jp: '곤방와' },
            { ko: '감사합니다', en: 'Thank you', pr_en: '땡큐', jp: 'ありがとうございます', pr_jp: '아리가또- 고자이마스' },
            { ko: '천만에요 (아녜요)', en: 'You\'re welcome', pr_en: '유어 웰컴', jp: 'いいえ、いいえ', pr_jp: '이이에, 이이에' },
            { ko: '죄송합니다', en: 'I am sorry', pr_en: '아이 엠 쏘리', jp: 'すみません', pr_jp: '스미마센' },
            { ko: '저기요 / 실례합니다', en: 'Excuse me', pr_en: '익스큐즈 미', jp: 'すみません', pr_jp: '스미마센' },
            { ko: '잠시만요', en: 'Just a moment', pr_en: '저스트 어 모먼트', jp: 'ちょっと待ってください', pr_jp: '춋또 맛떼 쿠다사이' },
            { ko: '일본어 못해요', en: 'I cannot speak Japanese', pr_en: '아이 캔낫 스피크 재패니즈', jp: '日本語できません', pr_jp: '니혼고 데키마센' },
            { ko: '한국어 메뉴 있나요?', en: 'Korean menu?', pr_en: '코리안 메뉴?', jp: '韓国語のメニューありますか', pr_jp: '칸코쿠고노 메뉴- 아리마스까' },
            { ko: '네', en: 'Yes', pr_en: '예스', jp: 'はい', pr_jp: '하이' },
            { ko: '아니요', en: 'No', pr_en: '노', jp: 'いいえ', pr_jp: '이이에' },
            { ko: '괜찮아요 (거절)', en: 'No, thank you', pr_en: '노 땡큐', jp: '大丈夫です', pr_jp: '다이죠-부 데스' },
            { ko: '못 알아들었어요', en: 'I don\'t understand', pr_en: '아이 돈 언더스탠드', jp: 'わかりません', pr_jp: '와카리마센' },
            { ko: '다시 말해주세요', en: 'Once more?', pr_en: '원스 모어?', jp: 'もう一回お願いします', pr_jp: '모- 잇카이 오네가이시마스' },
            { ko: '천천히 말해주세요', en: 'Slowly, please', pr_en: '슬로우리 플리즈', jp: 'ゆっくりお願いします', pr_jp: '윳쿠리 오네가이시마스' },
            { ko: '써주세요', en: 'Write it down', pr_en: '라이트 잇 다운', jp: '書いてください', pr_jp: '카이떼 쿠다사이' },
            { ko: '사진 찍어주세요', en: 'Take a picture?', pr_en: '테이크 어 픽쳐?', jp: '写真撮ってもらえますか', pr_jp: '샤신 톳떼 모라에마스까' },
            { ko: '화장실 어디예요?', en: 'Where is the restroom?', pr_en: '웨어 이즈 더 레스트룸?', jp: 'トイレはどこですか', pr_jp: '토이레와 도코데스까' },
            { ko: '편의점 어디예요?', en: 'Convenience store?', pr_en: '컨비니언스 스토어?', jp: 'コンビニはどこですか', pr_jp: '콤비니와 도코데스까' }
        ],
        yatai: [
            { ko: '몇 명이에요 (손가락)', en: 'How many people', pr_en: '하우 매니 피플', jp: '何名様ですか', pr_jp: '난메이 사마 데스까' },
            { ko: '자리 있나요?', en: 'Any seats?', pr_en: '애니 시츠?', jp: '空いてますか', pr_jp: '아이떼마스까' },
            { ko: '추천 메뉴 주세요', en: 'Recommendation?', pr_en: '레코멘데이션?', jp: 'おすすめください', pr_jp: '오스스메 쿠다사이' },
            { ko: '오뎅 주세요', en: 'Oden, please', pr_en: '오뎅 플리즈', jp: 'おでんください', pr_jp: '오뎅 쿠다사이' },
            { ko: '라멘 주세요', en: 'Ramen, please', pr_en: '라멘 플리즈', jp: 'ラーメンください', pr_jp: '라-멘 쿠다사이' },
            { ko: '생맥주 주세요', en: 'Draft beer', pr_en: '드래프트 비어', jp: '生ビールください', pr_jp: '나마비-루 쿠다사이' },
            { ko: '화장실 멀어요?', en: 'Must go restroom', pr_en: '머스트 고 레스트룸', jp: 'トイレ遠いですか', pr_jp: '토이레 토-이데스까' },
            { ko: '옆에 앉아도 되나요?', en: 'Sit here?', pr_en: '싯 히어?', jp: '隣いいですか', pr_jp: '토나리 이이데스까' },
            { ko: '잘 먹었습니다', en: 'Delicious', pr_en: '딜리셔스', jp: 'ごちそうさまでした', pr_jp: '고치소-사마데시따' }
        ],
        ryokan: [
            { ko: '체크인 할게요', en: 'Check-in', pr_en: '체크인', jp: 'チェックインお願いします', pr_jp: '쳇쿠인 오네가이시마스' },
            { ko: '가족탕 예약 가능한가요?', en: 'Private bath?', pr_en: '프라이빗 배스?', jp: '貸切風呂予約できますか', pr_jp: '카시키리부로 요야쿠 데키마스까' },
            { ko: '노천탕 어디예요?', en: 'Open-air bath?', pr_en: '오픈 에어 배스?', jp: '露天風呂はどこですか', pr_jp: '로텐부로와 도코데스까' },
            { ko: '문신 있는데 괜찮나요?', en: 'Tattoo OK?', pr_en: '타투 오케이?', jp: 'タトゥー大丈夫ですか', pr_jp: '타투- 다이죠-부 데스까' },
            { ko: '수건 빌려주세요', en: 'Rental towel', pr_en: '렌탈 타월', jp: 'タオル貸してください', pr_jp: '타오루 카시떼 쿠다사이' },
            { ko: '샴푸/비누 있나요?', en: 'Shampoo/Soap?', pr_en: '샴푸/솝?', jp: 'シャンプーありますか', pr_jp: '샴푸- 아리마스까' },
            { ko: '물 뜨겁나요?', en: 'Is it hot?', pr_en: '이즈 잇 핫?', jp: 'お湯は熱いですか', pr_jp: '오유와 아츠이데스까' },
            { ko: '사진 찍어도 되나요?', en: 'Photo OK?', pr_en: '포토 오케이?', jp: '写真撮ってもいいですか', pr_jp: '샤신 톳떼모 이이데스까' },
            { ko: '탈의실 어디예요?', en: 'Changing room?', pr_en: '체인징 룸?', jp: '脱衣所はどこですか', pr_jp: '다츠이죠와 도코데스까' },
            { ko: '석식 몇 시예요?', en: 'Dinner time?', pr_en: '디너 타임?', jp: '夕食は何時ですか', pr_jp: '유-쇼쿠와 난지데스까' },
            { ko: '조식 몇 시예요?', en: 'Breakfast time?', pr_en: '브렉퍼스트 타임?', jp: '朝食は何時ですか', pr_jp: '쵸-쇼쿠와 난지데스까' },
            { ko: '유카타 사이즈 바꿔주세요', en: 'Change Yukata size', pr_en: '체인지 유카타 사이즈', jp: '浴衣のサイズ変えてください', pr_jp: '유카타노 사이즈 카에떼 쿠다사이' },
            { ko: '송영 차량 있나요?', en: 'Shuttle bus?', pr_en: '셔틀 버스?', jp: '送迎バスありますか', pr_jp: '소-게이바스 아리마스까' },
            { ko: '자전거 빌릴 수 있나요?', en: 'Rent a bike?', pr_en: '렌트 어 바이크?', jp: '自転車借りれますか', pr_jp: '지텐샤 카리레마스까' },
            { ko: '유후인역 가주세요', en: 'To Yufuin station', pr_en: '투 유후인 스테이션', jp: '由布院駅までお願いします', pr_jp: '유후인에키마데 오네가이시마스' }
        ],
        airport: [
            { ko: '제 자리 어디예요?', en: 'Where is my seat?', pr_en: '웨어 이즈 마이 시트?', jp: '座席はどこですか', pr_jp: '자세키와 도코데스까' },
            { ko: '물 주세요', en: 'Water, please', pr_en: '워터 플리즈', jp: 'お水ください', pr_jp: '오미즈 쿠다사이' },
            { ko: '입국 신고서 도와주세요', en: 'Help with card', pr_en: '헬프 위드 카드', jp: '書き方教えてください', pr_jp: '카키카타 오시에떼 쿠다사이' },
            { ko: '짐이 안 나왔어요', en: 'No baggage', pr_en: '노 배기지', jp: '荷物が出てきません', pr_jp: '니모츠가 데테키마센' },
            { ko: '환전 어디서 해요?', en: 'Exchange?', pr_en: '익스체인지?', jp: '両替はどこですか', pr_jp: '료-가에와 도코데스까' },
            { ko: '유심 어디서 사요?', en: 'SIM card?', pr_en: '심 카드?', jp: 'SIMカードどこで買えますか', pr_jp: '심카-도 도코데 카에마스까' },
            { ko: '시내 가는 버스 어디예요?', en: 'Bus to city?', pr_en: '버스 투 시티?', jp: '市内行きのバスどこですか', pr_jp: '시나이 이키노 바스 도코데스까' },
            { ko: '택시 어디서 타요?', en: 'Taxi stand?', pr_en: '택시 스탠드?', jp: 'タクシー乗り場どこですか', pr_jp: '타쿠시- 노리바 도코데스까' },
            { ko: '와이파이 되나요?', en: 'Wi-Fi?', pr_en: '와이파이?', jp: 'Wi-Fiありますか', pr_jp: '와이파이 아리마스까' }
        ],
        transport: [
            { ko: '표 파는 곳 어디예요?', en: 'Ticket office?', pr_en: '티켓 오피스?', jp: '切符売り場どこですか', pr_jp: '킷뿌 우리바 도코데스까' },
            { ko: '도쿄역 가나요?', en: 'To Tokyo station?', pr_en: '투 도쿄 스테이션?', jp: '東京駅に行きますか', pr_jp: '토-쿄-에키니 이키마스까' },
            { ko: '이거 타면 되나요?', en: 'Is this right?', pr_en: '이즈 디스 라이트?', jp: 'これに乗ればいいですか', pr_jp: '코레니 노레바 이이데스까' },
            { ko: '얼마예요?', en: 'How much?', pr_en: '하우 머치?', jp: 'いくらですか', pr_jp: '이쿠라데스까' },
            { ko: '노선도 있어요?', en: 'Map?', pr_en: '맵?', jp: '路線図ありますか', pr_jp: '로센즈 아리마스까' },
            { ko: '여기서 내려주세요', en: 'Stop here', pr_en: '스탑 히어', jp: 'ここで降ろしてください', pr_jp: '코코데 오로시떼 쿠다사이' },
            { ko: '충전 어디서 해요?', en: 'Charge?', pr_en: '차지?', jp: 'チャージどこですか', pr_jp: '챠-지 도코데스까' },
            { ko: '출구 어디예요?', en: 'Exit?', pr_en: '엑시트?', jp: '出口はどこですか', pr_jp: '데구치와 도코데스까' },
            { ko: '엘리베이터 어디예요?', en: 'Elevator?', pr_en: '엘리베이터?', jp: 'エレベーターどこですか', pr_jp: '에레베-타- 도코데스까' }
        ],
        hotel: [
            { ko: '체크인 할게요', en: 'Check-in, please', pr_en: '체크인 플리즈', jp: 'チェックインお願いします', pr_jp: '쳇쿠인 오네가이시마스' },
            { ko: '제 이름으로 예약했어요', en: 'Reservation name...', pr_en: '레저베이션 네임...', jp: '予約してます', pr_jp: '요야쿠 시테이마스' },
            { ko: '와이파이 비번이 뭐예요?', en: 'Wi-Fi password?', pr_en: '와이파이 패스워드?', jp: 'Wi-Fiのパスワードは？', pr_jp: '와이파이 파스와-도와?' },
            { ko: '짐 맡겨도 되나요?', en: 'Leave bags?', pr_en: '리브 백스?', jp: '荷物預けられますか', pr_jp: '니모츠 아즈케라레마스까' },
            { ko: '수건 더 주세요', en: 'More towels', pr_en: '모어 타월스', jp: 'タオルください', pr_jp: '타오루 쿠다사이' },
            { ko: '물 안 나와요', en: 'No water', pr_en: '노 워터', jp: 'お湯が出ません', pr_jp: '오유가 데마센' },
            { ko: '방 청소 해주세요', en: 'Clean room', pr_en: '클린 룸', jp: '掃除お願いします', pr_jp: '소-지 오네가이시마스' },
            { ko: '체크아웃 할게요', en: 'Check-out', pr_en: '체크아웃', jp: 'チェックアウトお願いします', pr_jp: '쳇쿠아우토 오네가이시마스' },
            { ko: '택시 불러주세요', en: 'Taxi, please', pr_en: '택시 플리즈', jp: 'タクシー呼んでください', pr_jp: '타쿠시- 욘데 쿠다사이' }
        ],
        dining: [
            { ko: '몇 명이에요 (손가락)', en: 'This many', pr_en: '디스 매니', jp: '〇人です', pr_jp: '...닌 데스 (숫자 손짓)' },
            { ko: '주문할게요', en: 'Order, please', pr_en: '오더 플리즈', jp: '注文お願いします', pr_jp: '츄-몬 오네가이시마스' },
            { ko: '추천해주세요', en: 'Recommendation?', pr_en: '레코멘데이션?', jp: 'おすすめは？', pr_jp: '오스스메와?' },
            { ko: '이거 주세요 (가리키며)', en: 'This one', pr_en: '디스 원', jp: 'これください', pr_jp: '코레 쿠다사이' },
            { ko: '물 주세요', en: 'Water, please', pr_en: '워터 플리즈', jp: 'お水ください', pr_jp: '오미즈 쿠다사이' },
            { ko: '고수 빼주세요', en: 'No cilantro', pr_en: '노 실란트로', jp: 'パクチーぬきで', pr_jp: '파쿠치- 누키데' },
            { ko: '덜 맵게 해주세요', en: 'Less spicy', pr_en: '레스 스파이시', jp: '辛くしないで', pr_jp: '카라쿠 시나이데' },
            { ko: '계산서 주세요', en: 'Check, please', pr_en: '체크 플리즈', jp: 'お会計お願いします', pr_jp: '오카이케이 오네가이시마스' },
            { ko: '카드 돼요?', en: 'Card OK?', pr_en: '카드 오케이?', jp: 'カード使えますか', pr_jp: '카-도 츠카에마스까' },
            { ko: '따로 계산할게요', en: 'Separate checks', pr_en: '세퍼레이트 체크스', jp: '別々でお願いします', pr_jp: '베츠베츠데 오네가이시마스' },
            { ko: '포장 돼요?', en: 'To go?', pr_en: '투 고?', jp: '持ち帰りできますか', pr_jp: '모치카에리 데키마스까' }
        ],
        shopping: [
            { ko: '구경만 할게요', en: 'Just looking', pr_en: '저스트 루킹', jp: '見てるだけです', pr_jp: '미테루 다케데스' },
            { ko: '입어봐도 돼요?', en: 'Try on?', pr_en: '트라이 온?', jp: '試着いいですか', pr_jp: '시챠쿠 이이데스까' },
            { ko: '새거 있어요?', en: 'New one?', pr_en: '뉴 원?', jp: '新しいのありますか', pr_jp: '아타라시이노 아리마스까' },
            { ko: '면세 돼요?', en: 'Tax free?', pr_en: '택스 프리?', jp: '免税できますか', pr_jp: '멘제이 데키마스까' },
            { ko: '할인 돼요?', en: 'Discount?', pr_en: '디스카운트?', jp: '安くなりますか', pr_jp: '야스쿠 나리마스까' },
            { ko: '봉투 주세요', en: 'Bag, please', pr_en: '백 플리즈', jp: '袋ください', pr_jp: '후쿠로 쿠다사이' },
            { ko: '이거 주세요', en: 'This one', pr_en: '디스 원', jp: 'これください', pr_jp: '코레 쿠다사이' },
            { ko: '영수증 주세요', en: 'Receipt', pr_en: '리시트', jp: 'レシートください', pr_jp: '레시-토 쿠다사이' }
        ],
        emergency: [
            { ko: '도와주세요!', en: 'Help!', pr_en: '헬프!', jp: '助けて！', pr_jp: '타스케떼!' },
            { ko: '경찰!', en: 'Police!', pr_en: '폴리스!', jp: '警察！', pr_jp: '케이사츠!' },
            { ko: '구급차!', en: 'Ambulance!', pr_en: '앰뷸런스!', jp: '救急車！', pr_jp: '큐-큐-샤!' },
            { ko: '병원 어디예요?', en: 'Hospital?', pr_en: '호스피탈?', jp: '病院はどこですか', pr_jp: '뵤-인와 도코데스까' },
            { ko: '약국 어디예요?', en: 'Pharmacy?', pr_en: '파머시?', jp: '薬局はどこですか', pr_jp: '약쿄쿠와 도코데스까' },
            { ko: '소화제 있어요?', en: 'Digestion medicine?', pr_en: '다이제스천 메디신?', jp: '胃薬ありますか', pr_jp: '이구스리 아리마스까' },
            { ko: '진통제 있어요?', en: 'Painkiller?', pr_en: '페인 킬러?', jp: '痛み止めありますか', pr_jp: '이타미도메 아리마스까' },
            { ko: '아파요', en: 'It hurts', pr_en: '잇 허츠', jp: '痛いです', pr_jp: '이타이데스' },
            { ko: '잃어버렸어요', en: 'Lost it', pr_en: '로스트 잇', jp: 'なくしました', pr_jp: '나쿠시마시따' },
            { ko: '한국 대사관', en: 'Korean Embassy', pr_en: '코리안 엠버시', jp: '韓国大使館', pr_jp: '칸코쿠 타이시칸' },
            { ko: '한국어 하는 사람?', en: 'Korean speaker?', pr_en: '코리안 스피커?', jp: '韓国語できる人？', pr_jp: '칸코쿠고 데키루 히토?' }
        ]
    }
};
