import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

features_map = {
    'Beautiful Entrance Arch': 'arch_feature_1781611237827.png',
    '100% Vastu': 'vastu_feature_1781611252666.png',
    'Avenue Plantation': 'plantation_feature_1781611266594.png',
    'Compound Wall for Entire Venture': 'wall_feature_1781611281137.png',
    'Channelized Drainage': 'drainage_feature_1781611296748.png',
    'Children Park, Open Gym &amp; Temple': 'park_feature_1781611319550.png',
    '33 Feet Wide Roads': 'road_feature_1781611332668.png',
    'Water Supply for Each Plot': 'water_feature_1781611345793.png',
    'Electricity with Street Lights': 'electricity_feature_1781611385476.png',
    'Curbing Stones': 'curbing_feature_1781611401053.png',
    '24/7 Security with CCTV Monitoring': 'security_feature_1781611420747.png',
    '20 Feet Beat Damar Road': 'damar_road_feature_1781611436313.png',
    'Beat Road Connectivity from Main Road to Venture': 'damar_road_feature_1781611436313.png'
}

def replace_feature(match):
    title = match.group(1)
    img = features_map.get(title, 'arch_feature_1781611237827.png')
    return f'<div class="features__card-img-wrap">\n            <img src="pictures/{img}" alt="{title}" loading="lazy">\n          </div>\n          <div class="features__card-content">\n            <h3>{title}</h3>\n          </div>'

features_pattern = re.compile(r'<div class="features__card-icon">\s*<svg.*?</svg>\s*</div>\s*<h3>(.*?)</h3>', re.DOTALL)
html = features_pattern.sub(replace_feature, html)

amenities_map = {
    'Grand Aesthetic<br>Entrance Arch': 'arch_feature_1781611237827.png',
    '24/7 Security with<br>Cabin &amp; CCTV': 'security_feature_1781611420747.png',
    '30 &amp; 40 Feet Wide<br>Blacktop Roads': 'road_feature_1781611332668.png',
    'Electricity with<br>LED Street Lights': 'electricity_feature_1781611385476.png',
    'Green<br>Footpaths': 'footpaths_feature_1781611449877.png',
    'Compound Wall<br>for Entire Venture': 'wall_feature_1781611281137.png',
    'Drip Irrigation with<br>3 Years Maintenance': 'drip_irrigation_feature_1781611464768.png',
    'Avenue<br>Plantations': 'plantation_feature_1781611266594.png',
    'Pollution-Free<br>Zone': 'pollution_free_feature_1781611478901.png',
    'Clear Title &amp;<br>Spot Registration': 'clear_title_feature_1781611492187.png'
}

def replace_amenity(match):
    label = match.group(1)
    img = amenities_map.get(label, 'arch_feature_1781611237827.png')
    alt = label.replace("<br>", " ").replace("&amp;", "&")
    return f'<div class="amenities-strip__img-wrap">\n            <img src="pictures/{img}" alt="{alt}" loading="lazy">\n          </div>\n          <div class="amenities-strip__content">\n            <p class="amenities-strip__label">{label}</p>\n          </div>'

amenities_pattern = re.compile(r'<div class="amenities-strip__icon">\s*<svg.*?</svg>\s*</div>\s*<p class="amenities-strip__label">(.*?)</p>', re.DOTALL)
html = amenities_pattern.sub(replace_amenity, html)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
