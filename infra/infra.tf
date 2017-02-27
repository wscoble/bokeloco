provider "aws" {
  profile = "bokeloco"
  region = "us-east-1"
}

#### ACM SSL Configuration ####

data "aws_acm_certificate" "bokeloco" {
  domain = "bokeloco.com"
  statuses = ["ISSUED"]
}

#### S3 Configuration ####

resource "aws_s3_bucket" "bokeloco_logs" {
  bucket = "bokeloco-logs"
  acl = "private"
  tags {
    Project = "BokeLoco"
  }
}

resource "aws_s3_bucket" "bokeloco" {
    bucket = "bokeloco-com"
    versioning {
        enabled = true
    }
}

resource "aws_cloudfront_origin_access_identity" "origin_access_identity" {
  comment = "BokeLoco Orign Access ID"
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name = "${aws_s3_bucket.bokeloco.bucket_domain_name}"
    origin_id   = "bokelocoS3Origin"

    s3_origin_config {
      origin_access_identity = "${aws_cloudfront_origin_access_identity.origin_access_identity.cloudfront_access_identity_path}"
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "Some comment"
  default_root_object = "index.html"

  logging_config {
    bucket = "${aws_s3_bucket.bokeloco_logs.bucket_domain_name}"
  }

  aliases = ["bokeloco.com", "www.bokeloco.com"]

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "bokelocoS3Origin"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  price_class = "PriceClass_100"

  restrictions {
    geo_restriction {
      restriction_type = "none"
      /*restriction_type = "whitelist"
      locations        = ["US", "CA"]*/
    }
  }

  tags {
    Environment = "production"
    Project = "BokeLoco"
  }

  viewer_certificate {
    acm_certificate_arn = "${data.aws_acm_certificate.bokeloco.arn}"
    ssl_support_method = "sni-only"
    minimum_protocol_version = "TLSv1"
  }
}

#### DNS Configuration ####

data "aws_route53_zone" "bokeloco" {
  name = "bokeloco.com."
}

resource "aws_route53_zone" "main" {
  name = "${data.aws_route53_zone.bokeloco.name}"
  lifecycle {
    prevent_destroy = true
  }
  tags {
    Project = "BokeLoco"
  }
}

resource "aws_route53_record" "www" {
  zone_id = "${aws_route53_zone.main.zone_id}"
  name = "bokeloco.com"
  type = "A"

  alias {
    name = "${aws_cloudfront_distribution.s3_distribution.domain_name}"
    zone_id = "${aws_cloudfront_distribution.s3_distribution.hosted_zone_id}"
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "non-www" {
  zone_id = "${aws_route53_zone.main.zone_id}"
  name = "www"
  type = "CNAME"
  ttl = "5"
  records = ["bokeloco.com."]
}

resource "aws_route53_record" "google_verify" {
  zone_id = "${aws_route53_zone.main.zone_id}"
  name = "${data.aws_route53_zone.bokeloco.name}"
  type = "TXT"
  ttl = "5"
  records = ["google-site-verification=GcetNX6sQ6tRvOd03GYKvliRo5p8K_NXi1xbwERsM3I"]
}

resource "aws_route53_record" "aws_verify" {
  zone_id = "${aws_route53_zone.main.zone_id}"
  name = "_amazonses.${data.aws_route53_zone.bokeloco.name}"
  type = "TXT"
  ttl = "5"
  records = ["Bt0Wko7H62TIlmmIUaYEb3JbopTE1HZS7ULqamN+LMo="]
}

resource "aws_route53_record" "workmail_mx" {
  zone_id = "${aws_route53_zone.main.zone_id}"
  name = "${data.aws_route53_zone.bokeloco.name}"
  type = "MX"
  ttl = "5"
  records = ["10 inbound-smtp.us-east-1.amazonaws.com."]
}

resource "aws_route53_record" "autodiscover" {
  zone_id = "${aws_route53_zone.main.zone_id}"
  name = "autodiscover"
  type = "CNAME"
  ttl = "5"
  records = ["autodiscover.mail.us-east-1.awsapps.com."]
}

resource "aws_route53_record" "dkim1" {
  zone_id = "${aws_route53_zone.main.zone_id}"
  name = "jykomzxttwmfj7uizsyep5k2nmlpf46p._domainkey"
  type = "CNAME"
  ttl = "5"
  records = ["jykomzxttwmfj7uizsyep5k2nmlpf46p.dkim.amazonses.com."]
}

resource "aws_route53_record" "dkim2" {
  zone_id = "${aws_route53_zone.main.zone_id}"
  name = "whf322kgcbm5fo2ym7gpmbjpm7q5qtbz._domainkey"
  type = "CNAME"
  ttl = "5"
  records = ["whf322kgcbm5fo2ym7gpmbjpm7q5qtbz.dkim.amazonses.com."]
}

resource "aws_route53_record" "dkim3" {
  zone_id = "${aws_route53_zone.main.zone_id}"
  name = "3lo7j7iyop6vuhwx4u5aw5yisubaz3jk._domainkey"
  type = "CNAME"
  ttl = "5"
  records = ["3lo7j7iyop6vuhwx4u5aw5yisubaz3jk.dkim.amazonses.com."]
}
