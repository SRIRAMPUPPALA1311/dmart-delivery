/* ============================================================
   DMart Delivery – Store Module (Product Catalog)
   ============================================================ */
(function () {
  'use strict';

  var Store = {};
  var currentDept = '';
  var currentSearch = '';
  var currentSort = 'popular';
  var currentPage = 1;
  var perPage = 24;

  var DEPT_IMAGES = {
    grocery: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=200&q=80',
    fruits: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=200&q=80',
    dairy: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=200&q=80',
    beverages: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=200&q=80',
    snacks: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=200&q=80',
    personal: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=200&q=80',
    home: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=200&q=80',
    baby: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=200&q=80',
    frozen: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=200&q=80',
    meat: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=200&q=80',
    bakery: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=200&q=80',
    health: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=200&q=80',
    pets: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=200&q=80',
    electronics: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=200&q=80'
  };

  /* ---- render ---- */
  Store.render = function (params) {
    params = params || {};
    currentDept   = params.department || '';
    currentSearch = params.search || '';
    currentSort   = params.sort || 'popular';
    currentPage   = parseInt(params.page, 10) || 1;

    var departments = DMart.getDepartments();
    var result = DMart.getProducts({
      department: currentDept,
      search: currentSearch,
      sort: currentSort,
      page: currentPage,
      perPage: perPage
    });

    var html = '';    /* Hero / Search */
    html += '<section class="store-hero" style="background:linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);padding:40px 20px;position:relative;overflow:hidden;border-radius:0 0 16px 16px;">';
    html += '<div class="absolute inset-0" style="position:absolute;top:0;left:0;right:0;bottom:0;opacity:0.15;background:radial-gradient(circle at 80% 20%, rgba(255,255,255,0.4) 0%, transparent 60%);pointer-events:none;"></div>';
    html += '<div class="container" style="max-width:1152px;margin:0 auto;position:relative;z-index:10;display:flex;align-items:center;justify-content:space-between;gap:32px;">';
    
    html += '<div style="flex:1;max-width:700px;color:white;">';
    html += '<div class="hero-tagline" style="display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.2);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.2);padding:6px 16px;border-radius:100px;font-size:13px;font-weight:700;margin-bottom:14px;">';
    html += '⚡ Fast 10-Minute Delivery in Mancherial';
    html += '</div>';
    html += '<h1 style="font-family:var(--font-display);font-size:40px;font-weight:800;line-height:1.2;margin-bottom:16px;letter-spacing:-0.5px;text-shadow:0 2px 4px rgba(0,0,0,0.1);">Premium Groceries <span style="color:var(--secondary);">Direct to Home.</span></h1>';
    
    html += '<div class="store-search" style="position:relative;max-width:550px;">';
    html += '<span style="position:absolute;left:16px;top:50%;transform:translateY(-50%);color:var(--text-muted);font-size:18px;pointer-events:none;">🔍</span>';
    html += '<input type="text" class="store-search-input" id="store-search" placeholder="Search for fresh fruits, milk, snacks..." value="' + escHtml(currentSearch) + '" style="width:100%;height:48px;padding-left:48px;padding-right:16px;border-radius:12px;border:none;box-shadow:0 8px 16px rgba(0,0,0,0.08);font-size:15px;font-weight:500;outline:none;color:var(--text-primary);background:white;">';
    html += '<div class="search-dropdown" id="search-dropdown" style="position:absolute;top:100%;left:0;right:0;background:white;border-radius:12px;box-shadow:var(--shadow-lg);border:1px solid var(--border);margin-top:8px;max-height:300px;overflow-y:auto;z-index:1000;display:none;"></div>';
    html += '</div>';
    html += '</div>';
    
    html += '<div class="hidden-md" style="width:180px;height:180px;border-radius:50%;border:6px solid rgba(255,255,255,0.2);overflow:hidden;box-shadow:var(--shadow-lg);flex-shrink:0;">';
    html += '<img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80" alt="Fresh groceries" style="width:100%;height:100%;object-fit:cover;">';
    html += '</div>';
    
    html += '</div>';
    html += '</section>';

    /* Categories circle cards slider */
    html += '<div class="container" style="max-width:1152px;margin:20px auto 0;padding:0 16px;">';
    html += '<section class="categories-section" style="background:white;border-radius:16px;border:1px solid var(--border);padding:20px;box-shadow:var(--shadow);">';
    html += '<h2 style="font-family:var(--font-display);font-size:16px;font-weight:800;margin-bottom:12px;color:var(--text-primary);">Shop by Category</h2>';
    html += '<div class="categories-slider" style="display:flex;overflow-x:auto;gap:16px;padding-bottom:8px;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;scrollbar-width:none;">';
    
    var isAllActive = currentDept === '';
    html += '<button class="category-circle-card" onclick="DMart.Store.setDept(\'\')" style="background:none;border:none;outline:none;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:6px;min-width:80px;opacity:' + (isAllActive ? '1' : '0.7') + ';transition:all 0.2s;">';
    html += '<div class="circle-image-wrapper" style="width:64px;height:64px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:' + (isAllActive ? 'var(--primary)' : '#f1f5f9') + ';box-shadow:' + (isAllActive ? '0 4px 10px rgba(40,116,240,0.3)' : 'none') + ';transition:all 0.2s;">';
    html += '<span style="font-size:22px;color:' + (isAllActive ? 'white' : 'var(--text-secondary)') + ';">🛍️</span>';
    html += '</div>';
    html += '<span style="font-size:12px;font-weight:700;color:' + (isAllActive ? 'var(--primary)' : 'var(--text-primary)') + ';text-align:center;">All</span>';
    html += '</button>';

    for (var d = 0; d < departments.length; d++) {
      var dep = departments[d];
      var isActive = currentDept === dep.id;
      var imgUrl = DEPT_IMAGES[dep.id] || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=200&q=80';
      html += '<button class="category-circle-card" onclick="DMart.Store.setDept(\'' + dep.id + '\')" style="background:none;border:none;outline:none;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:6px;min-width:80px;opacity:' + (isActive ? '1' : '0.7') + ';transition:all 0.2s;">';
      html += '<div class="circle-image-wrapper" style="width:64px;height:64px;border-radius:50%;display:flex;align-items:center;justify-content:center;overflow:hidden;background:#f1f5f9;' + (isActive ? 'box-shadow: 0 0 0 3px var(--primary);' : 'border: 1px solid var(--border);') + ';transition:all 0.2s;">';
      html += '<img src="' + imgUrl + '" alt="' + dep.name + '" style="width:100%;height:100%;object-fit:cover;">';
      html += '</div>';
      html += '<span style="font-size:12px;font-weight:700;color:' + (isActive ? 'var(--primary)' : 'var(--text-primary)') + ';text-align:center;max-width:80px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + dep.name.split(' ')[0] + '</span>';
      html += '</button>';
    }
    html += '</div>';
    html += '</section>';
    html += '</div>';

    /* Animated Promotional Banner Carousel */
    html += '<div class="container" style="max-width:1152px;margin:20px auto 0;padding:0 16px;">';
    html += '<div class="store-carousel" id="promo-carousel" style="width:100%;height:180px;border-radius:12px;overflow:hidden;position:relative;box-shadow:var(--shadow);">';
    
    // Slide 1
    html += '<div class="carousel-slide active" style="width:100%;height:100%;position:absolute;top:0;left:0;display:flex;align-items:center;background:linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);color:white;padding:24px 48px;transition:opacity 0.5s ease-in-out;opacity:1;z-index:10;">';
    html += '<div style="flex:1;">';
    html += '<span style="background:var(--secondary);color:#212121;font-size:11px;font-weight:800;padding:4px 10px;border-radius:20px;text-transform:uppercase;letter-spacing:1px;">BIG BILLION DAYS</span>';
    html += '<h2 style="font-family:var(--font-display);font-size:26px;font-weight:800;margin-top:10px;margin-bottom:8px;color:#ffffff;line-height:1.2;">Flat 50% Off on Staples!</h2>';
    html += '<p style="font-size:14px;color:rgba(255,255,255,0.9);margin-bottom:0;">Stock up your monthly pantry items with zero delivery fee.</p>';
    html += '</div>';
    html += '<div style="font-size:80px;opacity:0.25;user-select:none;">🍚</div>';
    html += '</div>';
    
    // Slide 2
    html += '<div class="carousel-slide" style="width:100%;height:100%;position:absolute;top:0;left:0;display:flex;align-items:center;background:linear-gradient(135deg, #b91c1c 0%, #991b1b 100%);color:white;padding:24px 48px;transition:opacity 0.5s ease-in-out;opacity:0;z-index:1;">';
    html += '<div style="flex:1;">';
    html += '<span style="background:#ffffff;color:#b91c1c;font-size:11px;font-weight:800;padding:4px 10px;border-radius:20px;text-transform:uppercase;letter-spacing:1px;">MANCHERIAL FRESH</span>';
    html += '<h2 style="font-family:var(--font-display);font-size:26px;font-weight:800;margin-top:10px;margin-bottom:8px;color:#ffffff;line-height:1.2;">Fresh Mangoes & Fruits 🥦</h2>';
    html += '<p style="font-size:14px;color:rgba(255,255,255,0.9);margin-bottom:0;">Freshly harvested from organic farms around Mancherial, TS.</p>';
    html += '</div>';
    html += '<div style="font-size:80px;opacity:0.25;user-select:none;">🥭</div>';
    html += '</div>';

    // Slide 3
    html += '<div class="carousel-slide" style="width:100%;height:100%;position:absolute;top:0;left:0;display:flex;align-items:center;background:linear-gradient(135deg, #d97706 0%, #b45309 100%);color:white;padding:24px 48px;transition:opacity 0.5s ease-in-out;opacity:0;z-index:1;">';
    html += '<div style="flex:1;">';
    html += '<span style="background:var(--primary);color:white;font-size:11px;font-weight:800;padding:4px 10px;border-radius:20px;text-transform:uppercase;letter-spacing:1px;">10-MIN EXPRESS</span>';
    html += '<h2 style="font-family:var(--font-display);font-size:26px;font-weight:800;margin-top:10px;margin-bottom:8px;color:#ffffff;line-height:1.2;">Beat the Heat Sale 🥤</h2>';
    html += '<p style="font-size:14px;color:rgba(255,255,255,0.9);margin-bottom:0;">Cold drinks, dairy milk boxes, ice creams delivered chilled to your door.</p>';
    html += '</div>';
    html += '<div style="font-size:80px;opacity:0.25;user-select:none;">🥤</div>';
    html += '</div>';

    // Carousel Dots
    html += '<div style="position:absolute;bottom:12px;left:50%;transform:translateX(-50%);display:flex;gap:6px;z-index:20;">';
    html += '<span class="carousel-dot active" onclick="event.stopPropagation();DMart.Store.setSlide(0)" style="width:8px;height:8px;border-radius:50%;background:white;cursor:pointer;transition:all 0.2s;opacity:1;"></span>';
    html += '<span class="carousel-dot" onclick="event.stopPropagation();DMart.Store.setSlide(1)" style="width:8px;height:8px;border-radius:50%;background:white;cursor:pointer;transition:all 0.2s;opacity:0.5;"></span>';
    html += '<span class="carousel-dot" onclick="event.stopPropagation();DMart.Store.setSlide(2)" style="width:8px;height:8px;border-radius:50%;background:white;cursor:pointer;transition:all 0.2s;opacity:0.5;"></span>';
    html += '</div>';

    html += '</div>'; // promo-carousel
    html += '</div>';

    /* Store Content Container */
    html += '<div class="container" style="max-width:1152px;margin:24px auto 0;padding:0 16px;">';

    /* Sorting and Results count bar */
    html += '<div class="filter-bar" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:12px;">';
    html += '<span class="products-count" style="font-size:14px;color:var(--text-muted);font-weight:600;">' + DMart.utils.formatNumber(result.total) + ' products</span>';
    html += '<div style="display:flex;align-items:center;gap:12px;">';
    html += '<select class="sort-select" id="sort-select" style="padding:8px 12px;border-radius:8px;border:1px solid var(--border);background:white;color:var(--text-primary);font-size:14px;font-weight:600;outline:none;cursor:pointer;">';
    html += '<option value="relevance"' + (currentSort === 'relevance' ? ' selected' : '') + '>Sort by: Popularity</option>';
    html += '<option value="price-low"' + (currentSort === 'price-low' ? ' selected' : '') + '>Price: Low to High</option>';
    html += '<option value="price-high"' + (currentSort === 'price-high' ? ' selected' : '') + '>Price: High to Low</option>';
    html += '<option value="rating"' + (currentSort === 'rating' ? ' selected' : '') + '>Top Rated</option>';
    html += '<option value="discount"' + (currentSort === 'discount' ? ' selected' : '') + '>Best Discount</option>';
    html += '<option value="name-az"' + (currentSort === 'name-az' ? ' selected' : '') + '>Name: A to Z</option>';
    html += '</select>';
    html += '</div>';
    html += '</div>';

    var isDefaultView = currentDept === '' && currentSearch === '';

    if (isDefaultView) {
      var deals = result.products.slice(0, 5);
      var fresh = result.products.slice(5, 10);
      var remaining = result.products.slice(10);

      if (deals.length > 0) {
        html += '<section class="store-section" style="margin-bottom:32px;">';
        html += '<h2 style="font-family:var(--font-display);font-size:20px;font-weight:800;color:var(--text-primary);display:flex;align-items:center;gap:6px;margin-bottom:16px;">Today\'s Deals <span style="color:#f97316;">⚡</span></h2>';
        html += '<div class="products-grid" style="display:grid;grid-template-columns:repeat(auto-fill, minmax(200px, 1fr));gap:20px;">';
        for (var i = 0; i < deals.length; i++) {
          html += renderProductCard(deals[i]);
        }
        html += '</div>';
        html += '</section>';
      }

      if (fresh.length > 0) {
        html += '<section class="store-section" style="margin-bottom:32px;">';
        html += '<h2 style="font-family:var(--font-display);font-size:20px;font-weight:800;color:var(--text-primary);display:flex;align-items:center;gap:6px;margin-bottom:16px;">Fresh Picks 🥦</h2>';
        html += '<div class="products-grid" style="display:grid;grid-template-columns:repeat(auto-fill, minmax(200px, 1fr));gap:20px;">';
        for (var i = 0; i < fresh.length; i++) {
          html += renderProductCard(fresh[i]);
        }
        html += '</div>';
        html += '</section>';
      }

      if (remaining.length > 0) {
        html += '<section class="store-section" style="margin-bottom:32px;">';
        html += '<h2 style="font-family:var(--font-display);font-size:20px;font-weight:800;margin-bottom:16px;color:var(--text-primary);">All Products</h2>';
        html += '<div class="products-grid" style="display:grid;grid-template-columns:repeat(auto-fill, minmax(200px, 1fr));gap:20px;">';
        for (var i = 0; i < remaining.length; i++) {
          html += renderProductCard(remaining[i]);
        }
        html += '</div>';
        if (result.totalPages > 1) {
          html += renderPagination(result.page, result.totalPages);
        }
        html += '</section>';
      }
    } else {
      html += '<section class="store-section" style="margin-bottom:32px;">';
      var headerText = currentSearch ? 'Search Results for "' + currentSearch + '"' : (departments.find(function(d) { return d.id === currentDept; }) || {}).name || 'Products';
      html += '<h2 style="font-family:var(--font-display);font-size:20px;font-weight:800;margin-bottom:16px;color:var(--text-primary);">' + escHtml(headerText) + '</h2>';
      
      if (result.products.length === 0) {
        html += '<div class="no-products" style="text-align:center;padding:64px 24px;border:1px dashed var(--border);background:white;border-radius:24px;">';
        html += '<div style="font-size:48px;margin-bottom:16px;">🔍</div>';
        html += '<h3 style="font-size:18px;font-weight:700;color:var(--text-primary);">No products found</h3>';
        html += '<p style="color:var(--text-muted);font-size:14px;margin-top:4px;">Try checking your spelling or sorting by a different filter.</p>';
        html += '</div>';
      } else {
        html += '<div class="products-grid" style="display:grid;grid-template-columns:repeat(auto-fill, minmax(200px, 1fr));gap:20px;">';
        for (var i = 0; i < result.products.length; i++) {
          html += renderProductCard(result.products[i]);
        }
        html += '</div>';
        if (result.totalPages > 1) {
          html += renderPagination(result.page, result.totalPages);
        }
      }
      html += '</section>';
    }

    html += '</div>';
    return html;
  };

  function escHtml(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function renderProductCard(product) {
    var inWish = DMart.isInWishlist(product.id);
    
    // Check quantity in cart
    var cartItem = DMart.state.cart.find(function(it) { return it.productId === product.id; });
    var qty = cartItem ? cartItem.qty : 0;

    var h = '';
    h += '<div class="product-card" data-product-id="' + product.id + '" style="background:white;border-radius:16px;border:1px solid var(--border);overflow:hidden;transition:var(--transition);cursor:pointer;position:relative;display:flex;flex-direction:column;min-height:340px;box-shadow:var(--shadow);">';
    
    /* Image Section */
    var imgUrl = product.imageUrl || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80';
    h += '<div class="product-image" style="width:100%;height:140px;background:#f8fafc;display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative;padding:12px;">';
    h += '<img src="' + imgUrl + '" alt="' + escHtml(product.name) + '" style="max-width:100%;max-height:100%;object-fit:contain;transition:transform 0.3s;" class="card-img">';
    
    if (product.discount > 0) {
      h += '<span class="product-discount" style="position:absolute;top:10px;left:10px;background:var(--secondary);color:white;padding:2px 8px;border-radius:20px;font-size:10px;font-weight:800;letter-spacing:0.5px;">' + product.discount + '% OFF</span>';
    }
    if (!product.inStock) {
      h += '<span class="product-out-of-stock" style="position:absolute;bottom:10px;left:10px;background:#f87171;color:white;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;">Out of Stock</span>';
    }
    
    h += '<button class="product-wishlist' + (inWish ? ' active' : '') + '" data-wish-id="' + product.id + '" onclick="event.stopPropagation();DMart.Store.toggleWish(\'' + product.id + '\')" style="position:absolute;top:10px;right:10px;width:30px;height:30px;border-radius:50%;background:white;border:1px solid var(--border);color:' + (inWish ? '#ef4444' : 'var(--text-muted)') + ';cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:16px;box-shadow:var(--shadow);transition:var(--transition);">♥</button>';
    h += '</div>';

    /* Info Section */
    h += '<div class="product-info" style="padding:12px;display:flex;flex-direction:column;flex:1;">';
    h += '<div class="product-brand" style="font-size:11px;color:var(--text-muted);font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">' + escHtml(product.brand) + '</div>';
    h += '<div class="product-name" style="font-size:14px;font-weight:700;margin:4px 0 8px;color:var(--text-primary);line-height:1.3;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;height:36px;">' + escHtml(product.name) + '</div>';
    
    /* Variant Selector */
    var variants = DMart.getProductVariants(product.id);
    if (variants.length > 1) {
      h += '<div class="product-card-variants" onclick="event.stopPropagation();" style="margin-bottom:8px;">';
      h += '<select class="product-variant-select" onchange="DMart.Store.changeVariant(this, \'' + product.id + '\')" style="width:100%;padding:5px 8px;border-radius:6px;border:1px solid var(--border);font-size:12px;font-weight:600;color:var(--text-secondary);outline:none;background:#f8fafc;cursor:pointer;">';
      for (var v = 0; v < variants.length; v++) {
        var vr = variants[v];
        var isSel = vr.id === product.id ? ' selected' : '';
        h += '<option value="' + vr.id + '"' + isSel + '>' + escHtml(vr.unit) + ' - ' + DMart.utils.formatCurrency(vr.price) + '</option>';
      }
      h += '</select>';
      h += '</div>';
    } else {
      h += '<div style="font-size:12px;color:var(--text-muted);font-weight:600;margin-bottom:8px;padding:4px 0;">' + escHtml(product.unit || '1 unit') + '</div>';
    }
    
    h += '<div style="margin-top:auto;display:flex;align-items:center;justify-content:space-between;min-height:36px;">';
    
    // Price Block
    h += '<div class="product-price" style="display:flex;flex-direction:column;">';
    h += '<span class="current" style="font-size:16px;font-weight:800;color:var(--text-primary);">' + DMart.utils.formatCurrency(product.price) + '</span>';
    if (product.discount > 0 && product.originalPrice) {
      h += '<span class="original" style="font-size:11px;color:var(--text-muted);text-decoration:line-through;">' + DMart.utils.formatCurrency(product.originalPrice) + '</span>';
    }
    h += '</div>';

    // Actions block - Transition Stepper
    h += '<div class="product-card-action" style="display:flex;align-items:center;justify-content:flex-end;width:95px;">';
    if (product.inStock) {
      if (qty > 0) {
        h += '<div class="stepper-control" onclick="event.stopPropagation();" style="display:flex;align-items:center;background:var(--primary);color:white;border-radius:8px;overflow:hidden;height:32px;width:90px;justify-content:space-between;box-shadow:0 2px 4px rgba(24,20,243,0.15);">';
        h += '<button class="stepper-btn minus" onclick="DMart.Store.updateQtyClick(event, \'' + product.id + '\', ' + (qty - 1) + ')" style="border:none;background:transparent;color:white;width:28px;height:32px;font-weight:800;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;">−</button>';
        h += '<span class="stepper-value" style="font-weight:800;font-size:13px;color:white;">' + qty + '</span>';
        h += '<button class="stepper-btn plus" onclick="DMart.Store.updateQtyClick(event, \'' + product.id + '\', ' + (qty + 1) + ')" style="border:none;background:transparent;color:white;width:28px;height:32px;font-weight:800;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;">+</button>';
        h += '</div>';
      } else {
        h += '<button class="add-btn-outline" onclick="event.stopPropagation();DMart.Store.addClick(event, \'' + product.id + '\')" style="background:transparent;color:var(--primary);border:1.5px solid rgba(24, 20, 243, 0.4);padding:4px 12px;border-radius:8px;font-weight:800;font-size:12px;cursor:pointer;transition:var(--transition);height:32px;width:75px;display:flex;align-items:center;justify-content:center;">ADD</button>';
      }
    } else {
      h += '<button class="add-btn-outline disabled" disabled style="opacity:0.5;cursor:not-allowed;background:#f1f5f9;color:var(--text-muted);border:1px solid var(--border);height:32px;font-size:11px;font-weight:700;width:80px;text-align:center;border-radius:8px;">Sold Out</button>';
    }
    h += '</div>'; // close action wrapper

    h += '</div>'; // close flex row
    h += '</div>'; // close info
    h += '</div>'; // close card
    return h;
  }

  function renderPagination(page, totalPages) {
    var h = '<div class="pagination" style="display:flex;align-items:center;justify-content:center;gap:8px;padding:32px 0;">';
    h += '<button class="page-btn' + (page <= 1 ? ' disabled' : '') + '" data-page="' + (page - 1) + '"' + (page <= 1 ? ' disabled' : '') + ' style="padding:8px 16px;border-radius:8px;border:1px solid var(--border);background:white;color:var(--text-secondary);font-weight:600;cursor:pointer;">← Prev</button>';

    var start = Math.max(1, page - 2);
    var end = Math.min(totalPages, page + 2);

    if (start > 1) {
      h += '<button class="page-btn" data-page="1" style="width:36px;height:36px;border-radius:8px;border:1px solid var(--border);background:white;cursor:pointer;">1</button>';
      if (start > 2) h += '<span style="color:var(--text-muted);">…</span>';
    }
    for (var p = start; p <= end; p++) {
      var isActive = p === page;
      h += '<button class="page-btn' + (isActive ? ' active' : '') + '" data-page="' + p + '" style="width:36px;height:36px;border-radius:8px;border:' + (isActive ? '1px solid var(--primary)' : '1px solid var(--border)') + ';background:' + (isActive ? 'var(--primary)' : 'white') + ';color:' + (isActive ? 'white' : 'var(--text-primary)') + ';font-weight:700;cursor:pointer;">' + p + '</button>';
    }
    if (end < totalPages) {
      if (end < totalPages - 1) h += '<span style="color:var(--text-muted);">…</span>';
      h += '<button class="page-btn" data-page="' + totalPages + '" style="width:36px;height:36px;border-radius:8px;border:1px solid var(--border);background:white;cursor:pointer;">' + totalPages + '</button>';
    }

    h += '<button class="page-btn' + (page >= totalPages ? ' disabled' : '') + '" data-page="' + (page + 1) + '"' + (page >= totalPages ? ' disabled' : '') + ' style="padding:8px 16px;border-radius:8px;border:1px solid var(--border);background:white;color:var(--text-secondary);font-weight:600;cursor:pointer;">Next →</button>';
    h += '</div>';
    return h;
  }

  /* ---- actions ---- */
  Store.addClick = function(event, productId) {
    if (event) event.stopPropagation();
    DMart.addToCart(productId, 1);
  };

  Store.updateQtyClick = function(event, productId, newQty) {
    if (event) event.stopPropagation();
    DMart.updateCartQty(productId, newQty);
  };

  Store.setDept = function(deptId) {
    currentDept = deptId;
    currentPage = 1;
    rerender();
  };

  /* ---- init ---- */
  Store.init = function () {
    Store.startSlideShow();
    /* Sort */
    var sortSel = document.getElementById('sort-select');
    if (sortSel) {
      sortSel.addEventListener('change', function () {
        currentSort = sortSel.value;
        currentPage = 1;
        rerender();
      });
    }

    /* Search */
    var searchInput = document.getElementById('store-search');
    if (searchInput) {
      searchInput.addEventListener('input', DMart.utils.debounce(function () {
        var q = searchInput.value.trim();
        showSearchDropdown(q);
      }, 300));

      searchInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          closeSearchDropdown();
          currentSearch = searchInput.value.trim();
          currentPage = 1;
          rerender();
        }
      });

      document.addEventListener('click', function (e) {
        if (!e.target.closest('.store-search')) {
          closeSearchDropdown();
        }
      });
    }

    /* Pagination clicks */
    var pagWrapper = document.querySelector('.pagination');
    if (pagWrapper) {
      pagWrapper.addEventListener('click', function (e) {
        var btn = e.target.closest('.page-btn');
        if (!btn || btn.disabled || btn.classList.contains('disabled')) return;
        var p = parseInt(btn.getAttribute('data-page'), 10);
        if (p && p >= 1) {
          currentPage = p;
          rerender();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    }

    /* Product card clicks */
    var grid = document.getElementById('app');
    if (grid) {
      // Clean previous listener if any by checking targets
      grid.addEventListener('click', function (e) {
        var card = e.target.closest('.product-card');
        if (!card) return;
        if (e.target.closest('.add-btn-outline') || e.target.closest('.stepper-control') || e.target.closest('.product-wishlist') || e.target.closest('.product-card-variants')) return;
        var pid = card.getAttribute('data-product-id');
        if (pid) Store.showProduct(pid);
      });
    }
  };

  function rerender() {
    var appEl = document.getElementById('app');
    if (!appEl) return;
    var navbarHtml = (typeof DMart.renderNavbar === 'function') ? DMart.renderNavbar() : '';
    var sidebarHtml = (typeof DMart.Cart !== 'undefined' && DMart.Cart.renderSidebar) ? DMart.Cart.renderSidebar() : '';
    var content = Store.render({
      department: currentDept,
      search: currentSearch,
      sort: currentSort,
      page: currentPage
    });
    appEl.innerHTML = navbarHtml + content + sidebarHtml;
    Store.init();
    
    var links = document.querySelectorAll('.nav-link');
    links.forEach(function (l) {
      l.classList.toggle('active', l.textContent.indexOf('Shop') !== -1);
    });
    if (DMart.Cart && DMart.Cart.updateBadge) DMart.Cart.updateBadge();
  }

  /* ---- search dropdown ---- */
  function showSearchDropdown(query) {
    var dd = document.getElementById('search-dropdown');
    if (!dd) return;
    if (!query || query.length < 2) {
      dd.innerHTML = '';
      dd.style.display = 'none';
      return;
    }
    var result = DMart.getProducts({ search: query, page: 1, perPage: 8 });
    if (result.products.length === 0) {
      dd.innerHTML = '<div style="padding:12px;color:var(--text-muted);font-size:14px;text-align:center;">No results for "' + escHtml(query) + '"</div>';
      dd.style.display = 'block';
      return;
    }
    var h = '';
    for (var i = 0; i < result.products.length; i++) {
      var p = result.products[i];
      h += '<div class="search-dropdown-item" data-id="' + p.id + '" style="display:flex;align-items:center;gap:12px;padding:10px 16px;cursor:pointer;border-bottom:1px solid var(--border);transition:all 0.15s;">';
      h += '<img src="' + p.imageUrl + '" style="width:36px;height:36px;object-fit:contain;background:#f8fafc;border-radius:4px;padding:2px;">';
      h += '<div style="flex:1;min-width:0;">';
      h += '<div style="font-size:13px;font-weight:700;color:var(--text-primary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + escHtml(p.name) + '</div>';
      h += '<div style="font-size:11px;color:var(--text-muted);">' + escHtml(p.brand) + ' · ' + DMart.utils.formatCurrency(p.price) + '</div>';
      h += '</div>';
      h += '</div>';
    }
    if (result.total > 8) {
      h += '<div class="search-dropdown-more" id="search-see-all" style="padding:10px;text-align:center;font-size:12px;font-weight:700;color:#16a34a;cursor:pointer;background:#f0fdf4;">See all ' + result.total + ' results →</div>';
    }
    dd.innerHTML = h;
    dd.style.display = 'block';

    dd.querySelectorAll('.search-dropdown-item').forEach(function (el) {
      el.addEventListener('click', function () {
        var id = el.getAttribute('data-id');
        closeSearchDropdown();
        Store.showProduct(id);
      });
    });
    var seeAll = document.getElementById('search-see-all');
    if (seeAll) {
      seeAll.addEventListener('click', function () {
        closeSearchDropdown();
        currentSearch = query;
        currentPage = 1;
        rerender();
      });
    }
  }

  function closeSearchDropdown() {
    var dd = document.getElementById('search-dropdown');
    if (dd) { dd.innerHTML = ''; dd.style.display = 'none'; }
  }

  /* ---- Product Detail Modal ---- */
  Store.showProduct = function (id) {
    var product = DMart.getProductById(id);
    if (!product) return;

    var existing = document.querySelector('.modal-overlay');
    if (existing) existing.remove();

    var inWish = DMart.isInWishlist(product.id);
    var cartItem = DMart.state.cart.find(function(it) { return it.productId === product.id; });
    var qty = cartItem ? cartItem.qty : 1;

    var overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    
    var imgUrl = product.imageUrl || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80';
    
    var variants = DMart.getProductVariants(product.id);
    var variantHtml = '';
    if (variants.length > 1) {
      variantHtml += '<div class="product-modal-variants" style="margin-bottom:16px;">' +
             '<label style="display:block;font-size:12px;font-weight:700;color:var(--text-primary);margin-bottom:6px;">Select Variant:</label>' +
             '<select class="product-variant-select" id="modal-variant-select" style="width:100%;padding:8px 10px;border-radius:8px;border:1px solid var(--border);font-size:13px;font-weight:600;color:var(--text-primary);outline:none;background:#f8fafc;cursor:pointer;">' +
               variants.map(function(vr) {
                 return '<option value="' + vr.id + '"' + (vr.id === product.id ? ' selected' : '') + '>' + escHtml(vr.unit) + ' - ' + DMart.utils.formatCurrency(vr.price) + '</option>';
               }).join('') +
             '</select>' +
           '</div>';
    } else {
      variantHtml += '<div class="product-modal-unit" style="font-size:13px;color:var(--text-muted);font-weight:600;margin-bottom:16px;">Unit: ' + escHtml(product.unit || '1 unit') + '</div>';
    }

    overlay.innerHTML = '' +
      '<div class="modal product-modal" style="max-width:700px;width:90%;background:white;border-radius:24px;border:1px solid var(--border);box-shadow:var(--shadow-lg);padding:24px;position:relative;">' +
        '<button class="modal-close" id="modal-close-btn" style="position:absolute;top:16px;right:16px;border:none;background:#f1f5f9;color:var(--text-muted);width:32px;height:32px;border-radius:50%;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;">✕</button>' +
        '<div class="product-modal-body" style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:16px;">' +
          '<div class="product-modal-image" style="width:100%;height:300px;border-radius:16px;background:#f8fafc;display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative;padding:16px;border:1px solid var(--border);">' +
            '<img src="' + imgUrl + '" alt="' + escHtml(product.name) + '" style="max-width:100%;max-height:100%;object-fit:contain;">' +
            (product.discount > 0 ? '<div class="product-discount" style="position:absolute;top:12px;left:12px;background:var(--secondary);color:white;padding:4px 10px;border-radius:20px;font-size:11px;font-weight:800;">' + product.discount + '% OFF</div>' : '') +
          '</div>' +
          '<div class="product-modal-details" style="display:flex;flex-direction:column;">' +
            '<div class="product-brand" style="font-size:12px;color:var(--text-muted);font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">' + escHtml(product.brand) + '</div>' +
            '<h2 class="product-modal-name" style="font-family:var(--font-display);font-size:22px;font-weight:800;color:var(--text-primary);margin:4px 0 12px;line-height:1.2;">' + escHtml(product.name) + '</h2>' +
            '<div class="product-modal-rating" style="font-size:13px;font-weight:600;color:#eab308;display:flex;align-items:center;gap:4px;margin-bottom:12px;">⭐ ' + product.rating.toFixed(1) + ' <span style="color:var(--text-muted);font-weight:500;">(' + DMart.utils.formatNumber(product.ratingCount) + ' ratings)</span></div>' +
            '<div class="product-modal-price" style="display:flex;align-items:baseline;gap:8px;margin-bottom:8px;">' +
              '<span class="current" style="font-size:24px;font-weight:800;color:var(--text-primary);">' + DMart.utils.formatCurrency(product.price) + '</span>' +
              (product.discount > 0 && product.originalPrice ? '<span class="original" style="font-size:14px;color:var(--text-muted);text-decoration:line-through;">' + DMart.utils.formatCurrency(product.originalPrice) + '</span>' : '') +
            '</div>' +
            variantHtml +
            '<div class="product-modal-tags" style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:20px;">' + (product.tags || []).map(function (t) { return '<span class="tag" style="background:#f1f5f9;color:var(--text-secondary);font-size:11px;font-weight:600;padding:2px 8px;border-radius:6px;">' + escHtml(t) + '</span>'; }).join('') + '</div>' +
            
            '<div class="product-modal-qty" style="display:flex;align-items:center;gap:12px;margin-bottom:24px;">' +
              '<label style="font-size:14px;font-weight:700;color:var(--text-secondary);">Quantity:</label>' +
              '<div class="qty-selector" style="display:flex;align-items:center;border:1px solid var(--border);border-radius:8px;overflow:hidden;background:#f8fafc;">' +
                '<button class="qty-btn" id="modal-qty-minus" style="border:none;background:transparent;width:32px;height:32px;font-weight:700;font-size:16px;cursor:pointer;">−</button>' +
                '<span class="qty-value" id="modal-qty" style="padding:0 12px;font-weight:700;font-size:14px;min-width:24px;text-align:center;">' + qty + '</span>' +
                '<button class="qty-btn" id="modal-qty-plus" style="border:none;background:transparent;width:32px;height:32px;font-weight:700;font-size:16px;cursor:pointer;">+</button>' +
              '</div>' +
            '</div>' +
            
            '<div class="product-modal-actions" style="margin-top:auto;display:flex;gap:12px;">' +
              (product.inStock
                ? '<button class="btn btn-primary" id="modal-add-cart" style="flex:1;background:var(--primary);color:white;border:none;padding:12px;border-radius:12px;font-weight:700;cursor:pointer;">Add / Update Cart</button>'
                : '<button class="btn btn-primary disabled" disabled style="flex:1;background:#e2e8f0;color:var(--text-muted);border:none;padding:12px;border-radius:12px;font-weight:700;cursor:not-allowed;">Out of Stock</button>') +
              '<button class="btn btn-secondary' + (inWish ? ' active' : '') + '" id="modal-wish-btn" style="border:1px solid var(--border);background:' + (inWish ? '#fee2e2' : 'white') + ';color:' + (inWish ? '#ef4444' : 'var(--text-primary)') + ';padding:12px 16px;border-radius:12px;font-weight:700;cursor:pointer;">♥</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';

    document.body.appendChild(overlay);

    /* variant dropdown change listener */
    var modalVarSel = document.getElementById('modal-variant-select');
    if (modalVarSel) {
      modalVarSel.addEventListener('change', function () {
        overlay.remove();
        Store.showProduct(modalVarSel.value);
      });
    }

    /* qty */
    var qtyEl = document.getElementById('modal-qty');
    document.getElementById('modal-qty-minus').addEventListener('click', function () {
      if (qty > 1) { qty--; qtyEl.textContent = qty; }
    });
    document.getElementById('modal-qty-plus').addEventListener('click', function () {
      if (qty < 20) { qty++; qtyEl.textContent = qty; }
    });

    /* add to cart */
    var addBtn = document.getElementById('modal-add-cart');
    if (addBtn) {
      addBtn.addEventListener('click', function () {
        DMart.updateCartQty(product.id, qty);
        DMart.utils.toast(product.name + ' quantity updated!', 'success');
        overlay.remove();
      });
    }

    /* wishlist */
    var wishBtn = document.getElementById('modal-wish-btn');
    if (wishBtn) {
      wishBtn.addEventListener('click', function () {
        DMart.toggleWishlist(product.id);
        var isNow = DMart.isInWishlist(product.id);
        wishBtn.style.background = isNow ? '#fee2e2' : 'white';
        wishBtn.style.color = isNow ? '#ef4444' : 'var(--text-primary)';
        var cardBtn = document.querySelector('.product-wishlist[data-wish-id="' + product.id + '"]');
        if (cardBtn) cardBtn.classList.toggle('active', isNow);
      });
    }

    /* close */
    document.getElementById('modal-close-btn').addEventListener('click', function () { overlay.remove(); });
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) overlay.remove();
    });
  };

  /* ---- Promo Slide Show ---- */
  var currentSlide = 0;
  var slideInterval = null;

  Store.setSlide = function (idx) {
    currentSlide = idx;
    var slides = document.querySelectorAll('.carousel-slide');
    var dots = document.querySelectorAll('.carousel-dot');
    if (slides.length === 0) return;
    
    slides.forEach(function (slide, sIdx) {
      if (sIdx === idx) {
        slide.style.opacity = '1';
        slide.style.zIndex = '10';
        slide.classList.add('active');
      } else {
        slide.style.opacity = '0';
        slide.style.zIndex = '1';
        slide.classList.remove('active');
      }
    });

    dots.forEach(function (dot, dIdx) {
      if (dIdx === idx) {
        dot.style.opacity = '1';
        dot.style.transform = 'scale(1.2)';
        dot.classList.add('active');
      } else {
        dot.style.opacity = '0.5';
        dot.style.transform = 'scale(1)';
        dot.classList.remove('active');
      }
    });
  };

  Store.nextSlide = function () {
    var slides = document.querySelectorAll('.carousel-slide');
    if (slides.length === 0) return;
    var next = (currentSlide + 1) % slides.length;
    Store.setSlide(next);
  };

  Store.startSlideShow = function () {
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(function () {
      Store.nextSlide();
    }, 4000);
  };

  Store.stopSlideShow = function () {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = null;
    }
  };

  Store.changeVariant = function (selectEl, currentProductId) {
    var newProductId = selectEl.value;
    var card = selectEl.closest('.product-card');
    if (!card) return;

    var newProduct = DMart.getProductById(newProductId);
    if (!newProduct) return;

    var temp = document.createElement('div');
    temp.innerHTML = renderProductCard(newProduct);
    var newCard = temp.firstElementChild;

    card.parentNode.replaceChild(newCard, card);
  };

  /* ---- Wishlist toggle on card ---- */
  Store.toggleWish = function (id) {
    DMart.toggleWishlist(id);
    var isNow = DMart.isInWishlist(id);
    var btn = document.querySelector('.product-wishlist[data-wish-id="' + id + '"]');
    if (btn) {
      btn.classList.toggle('active', isNow);
      btn.style.color = isNow ? '#ef4444' : 'var(--text-muted)';
    }
  };

  /* Listen for cart-updated events */
  window.addEventListener('cart-updated', function () {
    if (DMart.state.currentPage === 'store') {
      rerender();
    }
  });

  /* expose */
  window.DMart = window.DMart || {};
  DMart.Store = Store;
})();
